import { Component, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Observable, Subscription, Subject } from 'rxjs/Rx';

import * as moment from 'moment';

import { Video } from '../../models/video.model';
import { PlayerService } from '../../../_core/services/player.service';
import { PlaylistService } from '../../../_core/services/playlist.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges, OnDestroy {

    // I/O volume
    @Output() volumeChange: EventEmitter<number>;
    @Input() volume: number;

    // I/O speed
    @Output() speedChange: EventEmitter<number>;
    @Input() speed: number;

    // Player
    player: any;                 // Player object api
    private ytEvent: any;                // Player state
    id: String;                  // Video id
    private isPlayerLoaded: boolean;     // state of player
    @Input() sidePlayer: String;         // Side of player (left or right)

    // Player control
    isPlaying: boolean;          // Play/Pause button
    isMuted: boolean;            // Mute/Unmute button

    // Video(s)
    @Input() video: Video;          // Current played video
    private playList: Video[];      // Playlist of video

    // Timer
    private timerControl$: Subject<number>;
    private timer$;
    private sub: Subscription;
    public  currDuration: string;
    @Output() nearEnd: EventEmitter<any>;

    constructor(
        private _playerService: PlayerService,
        private _playlistService: PlaylistService) {

        this._playlistService.onPlayPlaylist$.subscribe((pl) => {
            this.playList = pl.videolist;
        });

        this.isPlaying = false;
        this.isMuted   = false;

        this.isPlayerLoaded = false;

        this.speedChange   = new EventEmitter();
        this.volumeChange  = new EventEmitter();
        this.nearEnd       = new EventEmitter();

        this.timerControl$ = new Subject<number>();
        this.currDuration = '00:00';
    }

    onVolumeChange(vol) {
        if (!this.player || !this.video) { return; }

        if (vol < 1) {
            this.isMuted = true;
        } else if (vol > 1 && vol < 100) {
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

        // Only if not the first change
        if (this.player && changes.video && !changes.video.firstChange) {
            console.log('video change');
            // Load video
            this.player.cueVideoById(this.video.id);

            // Play video if:
            // - previous video is on playing
            // - is the first played video
            // - no active player found
            if (this.ytEvent === 1
            ||  this._playerService.isFirstPlay
            ||  this._playerService.getActivePlayer() === null) {
                this.initControl();
                this.playPauseVideo();
                this._playerService.setActivePlayer(this.sidePlayer);
            }
            // Set first played video to false
            this._playerService.isFirstPlay = false;
        }
    }

    //  Player event
    // Player state

    // -1 : non démarré
    // 0 : arrêté
    // 1 : en lecture
    // 2 : en pause
    // 3 : en mémoire tampon
    // 5 : en file d'attente
    onStateChange(event) {
        console.log('player change');
        this.ytEvent = event.data;
        this.stopTimer();

        if (this.ytEvent === 1) {
            this.timerControl$.next(this.getRemainingTime());
            this.isPlaying = true;

        } else if (this.ytEvent === 0) {
            this.isPlaying = false;

            if (this.playList && this.playList.length > 0) {

                if (this.sidePlayer === 'left') {
                    this._playerService.setPlayerLeft(this.playList[0]);

                } else {
                    this._playerService.setPlayerRight(this.playList[0]);
                }

                this.playList.shift();
                this._playlistService.setOnPlayPlayList(this.playList);
            }
        } else {
            this.isPlaying = false;
        }
    }
    savePlayer(player) {
        console.log('player ready');
        this.player = player;
    }

    // Play/Pause
    playPauseVideo() {
        if (!this.player || !this.video) { return; }

        if (this.player.getPlayerState() === 1) {
            this.player.pauseVideo();
            this.isPlaying = false;
            this._playerService.setActivePlayer(null);
            this.stopTimer();

        } else {
            this.player.playVideo();
            this.isPlaying = true;
            this._playerService.setActivePlayer(this.sidePlayer);

            this.stopTimer();
            this.timerControl$.next(this.getRemainingTime());
        }
    }

    // Mute/Unmute
    mute() {

        if (!this.player || !this.video) { return; }

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
        // this.player.unMute();
        this.isPlaying = false;
        this.isMuted   = false;
    }


    // Init Timer
    initTimer() {
        // console.log('Init Timer');
        this.timerControl$ = new Subject<number>();
        this.timer$ = this.timerControl$.switchMap(
            period => period ? Observable.timer(period, 1000) : Observable.empty()
        );
        this.sub = this.timer$.subscribe(t => {

            this.currDuration = moment.utc(Math.round(this.player.getCurrentTime() * 1000)).format('mm:ss').toString();

            // console.log(this.player.getCurrentTime());
            console.log(this.player.getCurrentTime() * 1000);
            console.log(Math.round(this.player.getCurrentTime()));
            console.log(this.currDuration);

            if (this.getRemainingTime() < 12) {
                console.log('***** ' + this.sidePlayer + ' Video near end ******');
                this.stopTimer();
                this.nearEnd.emit(this.player.getVolume());
            }
        });
    }
    getPlayerState() {
        return this.player.getPlayerState();
    }

    // Stop timer
    stopTimer() {
        // console.log('Stop Timer');
        this.timerControl$.next();
        if (this.sub) { this.sub.unsubscribe(); }
        this.initTimer();
    }

    getRemainingTime(): any {
        return Math.round(this.player.getDuration() - this.player.getCurrentTime());
    }
}
