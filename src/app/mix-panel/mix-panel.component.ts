import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs/Rx';

import { Video } from '../_shared/models/video.model';
import { Playlist } from '../_shared/models/playlist.model';
import { PlayerService } from '../_core/services/player.service';
import { PlaylistService } from '../_core/services/playlist.service';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-mix-panel',
  templateUrl: './mix-panel.component.html',
  styleUrls: ['./mix-panel.component.css']
})
export class MixPanelComponent {

    title = 'TurnTable';

    // Timer
    timerControl$: Subject<number> = new Subject<number>();
    timer$;
    sub: Subscription;

    private playList: Video[] = [];
    onPlayPlaylist: Playlist;
    searchResultPlaylist: Array<Video>;

    videoLeft;
    @ViewChild('left') playerLeft;
    volLeft: any;
    speedLeft: any;
    currVolLeft: any;

    videoRight;
    @ViewChild('right') playerRight;
    volRight: any;
    speedRight: any;
    currVolRight: any;

    crossFaderValue: any;

    setCrossFaderValue(value) {
        console.log(value);

/*
        const valLeft;
        const valRight;
        if (value < 50) {
            value / 100 *
            valLeft  =
            valRight =

        } else if (value >= 50) {
            valLeft  =
            valRight =
        }
        */
    }


    constructor(
        private _playerService: PlayerService,
        private _playlistService: PlaylistService,
        private _electronService: ElectronService) {

        this._playerService.playerLeft$.subscribe((vl) => {
            this.videoLeft = vl;
        });
        this._playerService.playerRight$.subscribe((vr) => {
            this.videoRight = vr;
        });

        this._playlistService.onPlayPlaylist$.subscribe((pl) => {
            this.onPlayPlaylist = pl;
        });
        this._playlistService.searchResultPlaylist$.subscribe((pl) => {
            this.searchResultPlaylist = pl;
        });

        this.crossFaderValue = 50;
    }


    // Manage mix
    triggerMixLTR(event) {
        console.log('Trigger mix left to right');
        this.currVolLeft = event;
        this.playerRight.playPauseVideo();
        this._playerService.setActivePlayer('right');
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
        this._playerService.setActivePlayer('left');
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

    public playPingPong() {
        if (this._electronService.isElectronApp) {
            // const pong: string = this._electronService.ipcRenderer.sendSync('ping');
            // console.log(pong);

            console.log(this._electronService.ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

            this._electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
                console.log(arg); // prints "pong"
            });
            this._electronService.ipcRenderer.send('asynchronous-message', 'ping');
        }
    }
    send() {
        this._electronService.ipcRenderer.send('asynchronous-message', {test: 'test'});
    }
    receive() {
        this._electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg); // prints "pong"
        });
    }
}
