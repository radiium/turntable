import { Component, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Observable, Subscription, Subject } from 'rxjs/Rx';

import { VideoModel } from '../_shared/_models/video.model';
import { VideoStateService } from '../_shared/_services/video-state.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges, OnDestroy {

    @Input()
    video: VideoModel;

    @Input()
    sidePlayer: String;

    @Output()
    nearEnd = new EventEmitter();

    // I/O volume
    @Output()
    volumeChange:  EventEmitter<number>  = new EventEmitter();
    @Input()
    volume: number;

    // I/O speed
    @Output()
    speedChange: EventEmitter<number> = new EventEmitter();
    @Input()
    speed: number;


    // Mute/Unmute button
    private sMute:   String = 'mute';
    private sUnmute: String = 'unmute';
    private muteBtn: String;

    // Play/Pause button
    private sPlay:   String = 'Play';
    private sPause:  String = 'Pause';
    private playBtn: String;

    // Video id
    private id: String; // = '8EaYwmv7hcA';

    // Object youtube Video Player
    private player;
    private ytEvent;

    playList;

    // Video state service instance
    private vss: VideoStateService;

    // Timer
    timerControl$: Subject<number> = new Subject<number>();
    timer$;
    sub: Subscription;

    constructor(VideoStateService: VideoStateService) {
        this.vss = VideoStateService;
        this.muteBtn = this.sMute;
        this.playBtn = this.sPlay;

        this.vss.playList$.subscribe((pl) => {
            this.playList = pl;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // Trigger when input change
    ngOnChanges(changes: SimpleChanges) {

        // Only if not the first change
        if (changes.video && !changes.video.firstChange) {
            console.log('video change');
            // Load video
            this.player.cueVideoById(this.video.videoId);

            // Play video if:
            // - previous video is on playing
            // - is the first played video
            // - no active player found
            if (this.ytEvent === 1 || this.vss.isFirstPlay || this.vss.getActivePlayer() === null) {
                this.initControl();
                this.playPauseVideo();
                this.vss.setActivePlayer(this.sidePlayer);
            }
            // Set first played video to false
            this.vss.isFirstPlay = false;
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
        this.ytEvent = event.data;
        this.stopTimer();

        if (this.ytEvent === 1) {
            this.timerControl$.next(this.getRemainingTime());

        } else if (this.ytEvent === 0) {

            if (this.playList && this.playList.length > 0) {

                if (this.sidePlayer === 'left') {
                    this.vss.setPlayerLeft(this.playList[0]);

                } else {
                    this.vss.setPlayerRight(this.playList[0]);
                }

                this.playList.shift();
                this.vss.setPlayList(this.playList);
            }
        }
    }
    savePlayer(player)   {
        this.player = player;
    }

    // Play/Pause
    playPauseVideo() {
        if (! this.player) { return; }
        if (this.player.getPlayerState() === 1) {
            this.player.pauseVideo();
            this.playBtn = this.sPlay;
            this.vss.setActivePlayer(null);
            this.stopTimer();

        } else {
            this.player.playVideo();
            this.playBtn = this.sPause;
            this.vss.setActivePlayer(this.sidePlayer);

            this.stopTimer();
            this.timerControl$.next(this.getRemainingTime());
        }
    }

    // Mute/Unmute
    mute() {
        if (! this.player) { return; }
        if (this.player.isMuted()) {
            this.player.unMute();
            this.muteBtn = this.sMute;
        } else {
            this.player.mute();
            this.muteBtn = this.sUnmute;
        }
    }

    // Set video control to default values
    initControl() {
        this.player.setPlaybackRate(1);
        // this.player.unMute();
        this.muteBtn = this.sMute;
        this.playBtn = this.sPlay;
    }


    // Init Timer
    initTimer() {
        // console.log('Init Timer');
        this.timerControl$ = new Subject<number>();
        this.timer$ = this.timerControl$.switchMap(
            period => period ? Observable.timer(period, 1000) : Observable.empty()
        );
        this.sub = this.timer$.subscribe(t => {
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
