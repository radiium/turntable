import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription,  } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/timer';

import * as moment from 'moment';

import { Video, Playlist } from '../../../_core/models';

import { PlayerStateService } from '../../../_core/services/player-state.service';
import { DataService } from '../../../_core/services/data.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges, OnDestroy {

    volume: number;

    // I/O speed
    @Output() speedChange: EventEmitter<number>;
    @Input() speed: number;

    // Player
    player: any;                        // Player object api
    private ytEvent: any;               // Player state
    id: String = 'Pl3YXl_m0uk';         // = 'gAfqguL88tA';
    private isPlayerLoaded: boolean;    // state of player
    @Input() sidePlayer: String;        // Side of player (left or right)

    // Player control
    isPlaying: boolean;
    isMuted: boolean;
    isRandom: boolean;

    // Video(s)
    @Input() video: Video;          // Current played video
    private onPlayPlaylist: Playlist;      // Playlist of video

    // Timer
    private timerControl$: Subject<number>;
    private timer$;
    private sub: Subscription;
    public  currDuration: string;
    @Output() nearEnd: EventEmitter<Boolean>;

    constructor(
    private _playerStateService: PlayerStateService,
    private dataService: DataService) {

        // Get playlist isRandom state
        this._playerStateService.setIsRandom(false);
        this._playerStateService.isRandom$.subscribe((isRandom) => {
            this.isRandom = isRandom;
        });

        this.dataService.onPlayPlaylist$.subscribe((pl) => {
            this.onPlayPlaylist = pl;
        });

        this.isPlaying = false;
        this.isMuted   = false;

        this.isPlayerLoaded = false;

        this.speedChange   = new EventEmitter();
        this.nearEnd       = new EventEmitter<Boolean>();

        this.timerControl$ = new Subject<number>();
        this.currDuration = '00:00';
    }

    ngOnInit() {
        this.volume = 100;

        if (this.sidePlayer === 'left') {
            // Get current volume left
            this._playerStateService.volumeLeft$.subscribe((volume) => {
                this.volume = volume;
                this.updateVolume(this.volume);
            });
            // Get current speed left
            this._playerStateService.speedLeft$.subscribe((speed) => {
                this.speed = speed;
                this.player.setPlaybackRate(speed);
            });

        } else if (this.sidePlayer === 'right') {
            // Get current volume right
            this._playerStateService.volumeRight$.subscribe((volume) => {
                this.volume = volume;
                this.updateVolume(this.volume);
            });
            // Get current speed right
            this._playerStateService.speedRight$.subscribe((speed) => {
                this.speed = speed;
                this.player.setPlaybackRate(speed);
            });
        }
    }

    onVolumeChange(vol) {
        if (this.sidePlayer === 'left') {
            this._playerStateService.setVolumeLeft(vol);
        } else if (this.sidePlayer === 'right') {
            this._playerStateService.setVolumeRight(vol);
        }
        this.updateVolume(vol);
    }

    updateVolume(vol) {
        if (vol === 0) {
            this.isMuted = true;
        } else if (vol > 0 && vol < 100) {
            this.isMuted = false;
        }
        this.player.setVolume(vol);
    }

    onSpeedChange(speed) {
        if (!this.player || !this.video) { return; }
        this.player.setPlaybackRate(speed);
    }

    ngOnDestroy() {
        if (this.sub) { this.sub.unsubscribe(); }
    }

    // Trigger when input change
    ngOnChanges(changes: SimpleChanges) {

        if (this.video) {
            this.id = this.video.id ;
        }

        // Only if not the first change
        if (this.player && changes.video && !changes.video.firstChange) {

            // Load video
            this.player.cueVideoById(this.video.id);

            // Play video if:
            // - previous video is on playing
            // - is the first played video
            // - no active player found
            // - previousValue is undefined (first video on this player)
            if (this.ytEvent === 1
            ||  this._playerStateService.isFirstPlay
            ||  this._playerStateService.getActivePlayer() === null
            ||  changes.video.previousValue === undefined) {
                this.initControl();
                this.playPauseVideo();
                this._playerStateService.setActivePlayer(this.sidePlayer);
            }
            // Set first played video to false
            this._playerStateService.isFirstPlay = false;
        }
    }

    // YT.PlayerState
    // UNSTARTED = -1 : non démarré
    // ENDED     =  0 : arrêté
    // PLAYING   =  1 : en lecture
    // PAUSED    =  2 : en pause
    // BUFFERING =  3 : en mémoire tampon
    // CUED      =  5 : en file d'attente
    onStateChange(event) {

        this.ytEvent = event.data;
        this.stopTimer();

        // Video not started
        if (this.ytEvent === YT.PlayerState.UNSTARTED) {
            this.isPlaying = false;
            this._playerStateService.setActivePlayer(null);

        // Video ended
        } else if (this.ytEvent === YT.PlayerState.ENDED) {
            this.isPlaying = false;
            this._playerStateService.setActivePlayer(null);

        // Video on play
        } else if (this.ytEvent === YT.PlayerState.PLAYING) {
            this.isPlaying = true;
            this.initTimer();
            this.timerControl$.next(this.getRemainingTime());
            this._playerStateService.setActivePlayer(this.sidePlayer);

        // Video paused
        } else if (this.ytEvent === YT.PlayerState.PAUSED) {
            this.isPlaying = false;
            this._playerStateService.setActivePlayer(null);

        // Video buffering
        } else if (this.ytEvent === YT.PlayerState.BUFFERING) {
            this.isPlaying = false;
            this._playerStateService.setActivePlayer(null);

        // Video cued
        } else if (this.ytEvent === YT.PlayerState.CUED) {
            this.isPlaying = false;
            this._playerStateService.setActivePlayer(null);
        }
    }

    getVideoToPlay() {
        let videoToPlay = null;
        if (this.isRandom) {
            const randomIndex = Math.floor(Math.random() * this.onPlayPlaylist.videolist.length);
            console.log('isRandom true => randomIndex=', randomIndex);
            videoToPlay = this.onPlayPlaylist.videolist[randomIndex];
        } else {
            console.log('isRandom false');
            videoToPlay = this.onPlayPlaylist.videolist[0];
        }
        return videoToPlay;
    }

    savePlayer(player) {
        this.player = player;
    }

    // Play/Pause
    playPauseVideo() {
        if (!this.player || !this.video) { return; }

        if (this.ytEvent === YT.PlayerState.PLAYING) {
            this.player.pauseVideo();
           //  this.isPlaying = false;
            // this._playerStateService.setActivePlayer(null);

        } else if (this.ytEvent !== YT.PlayerState.PLAYING) {
            this.player.playVideo();
            // this._playerStateService.setActivePlayer(this.sidePlayer);
            // this.isPlaying = true;
            // this.timerControl$.next(this.getRemainingTime());
        }
    }

    // Mute/Unmute
    mute() {
        if (!this.player || !this.video || this.player.getVolume() === 0) { return; }

        if (this.player.isMuted()) {
            this.player.unMute();
            this.isMuted = false;
        } else {
            this.player.mute();
            this.isMuted = true;
        }
    }

    // Set video control to default values
    initControl() {
        this.player.setPlaybackRate(1);
        this.player.setVolume(this.volume);
        this.player.unMute();
        this.isMuted = this.player.isMuted();
        this.isPlaying = false;
    }


    getPlayerState() {
        return this.player.getPlayerState();
    }

    // Init Timer
    initTimer() {
        this.timerControl$ = new Subject<number>();
        this.timer$ = this.timerControl$.switchMap((period) =>
            period ? Observable.timer(period, 1000) : Observable.empty()
        );
        this.sub = this.timer$.subscribe(t => {

            this.currDuration = moment.utc(Math.round(this.player.getCurrentTime() * 1000)).format('mm:ss').toString();

            if (this.getRemainingTime() < 12) {
                console.log('***** ' + this.sidePlayer + ' Video near end ******');
                this.stopTimer();
                this.nearEnd.emit(true);
            }
        });
    }

    // Stop timer
    stopTimer() {
        // console.log('Stop Timer');
        this.timerControl$.next();
        if (this.sub) { this.sub.unsubscribe(); }
        this.timer$ = Observable.empty();
    }

    getRemainingTime(): any {
        return Math.round(this.player.getDuration() - this.player.getCurrentTime());
    }
}
