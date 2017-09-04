import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Observable, Subscription, Subject } from 'rxjs/Rx';

import { VideoModel } from './_shared/_models/video.model';
import { VideoStateService } from './_shared/_services/video-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'TurnTable';

    // Timer
    timerControl$: Subject<number> = new Subject<number>();
    timer$;
    sub: Subscription;

    private playList: VideoModel[] = [];

    private videoLeft;
    @ViewChild('left') playerLeft;
    volLeft: any;
    speedLeft: any;
    currVolLeft: any;


    private videoRight;
    @ViewChild('right') playerRight;
    volRight: any;
    speedRight: any;
    currVolRight: any;


    constructor(private VideoStateService: VideoStateService) {
        VideoStateService.playerLeft$.subscribe((vl) => {
            this.videoLeft = vl;
        });
        VideoStateService.playerRight$.subscribe((vr) => {
            this.videoRight = vr;
        });
        VideoStateService.playList$.subscribe((pl) => {
            this.playList = pl;
        });
    }


    // Manage mix
    triggerMixLTR(event) {
        console.log('Trigger mix left to right');
        this.currVolLeft = event;
        this.playerRight.playPauseVideo();
        this.VideoStateService.setActivePlayer('right');
        this.initTimerLTR(event);

    }
    // Init Timer
    initTimerLTR(volume) {
        this.timerControl$ = new Subject<number>();
        this.timer$ = Observable.timer(15000, 1000);
        this.sub = this.timer$.subscribe(t => {
            this.volLeft = this.currVolLeft - 2;
            this.currVolLeft = this.volLeft;

            console.log(this.playerLeft.getPlayerState());
            if (this.playerLeft.getPlayerState() === 5
            ||  this.playerLeft.getPlayerState() === 0
            ||  this.playerLeft.getPlayerState() === -1) {
                console.log('stop timer');
                this.stopTimer();
            }
            console.log('LTR => ' + this.currVolLeft);
        });
    }



    triggerMixRTL(event) {
        console.log('Trigger mix right to left');
        this.currVolRight = event;
        this.playerLeft.playPauseVideo();
        this.VideoStateService.setActivePlayer('left');
        this.initTimerRTL(event);
    }
    // Init Timer
    initTimerRTL(volume) {
        this.timerControl$ = new Subject<number>();
        this.timer$ = Observable.timer(15000, 1000);
        this.sub = this.timer$.subscribe(t => {
            this.volRight = this.currVolRight - 2;
            this.currVolRight = this.volRight;

            console.log(this.playerRight.getPlayerState());
            if (this.playerRight.getPlayerState() === 5
            ||  this.playerRight.getPlayerState() === 0
            ||  this.playerRight.getPlayerState() === -1) {
                console.log('stop timer');
                this.stopTimer();
            }
            console.log('RTL => ' + this.currVolRight);
        });
    }

    // Stop timer
    stopTimer() {
        // console.log('Stop Timer');
        this.timerControl$.next();
        if (this.sub) { this.sub.unsubscribe(); }
        //  this.initTimer();
        this.timer$ = Observable.empty();
    }
}
