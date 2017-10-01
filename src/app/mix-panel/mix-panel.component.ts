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

    // Video left controls
    videoLeft;
    @ViewChild('left') playerLeft;
    volLeft: any;
    speedLeft: any;
    currVolLeft: any;

    // Video right controls
    videoRight;
    @ViewChild('right') playerRight;
    volRight: any;
    speedRight: any;
    currVolRight: any;

    // Cross fader controls
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

        // Get current player left
        this._playerService.playerLeft$.subscribe((vl) => {
            this.videoLeft = vl;
        });
        // Get current player right
        this._playerService.playerRight$.subscribe((vr) => {
            this.videoRight = vr;
        });

        // Get on lay playlist
        this._playlistService.onPlayPlaylist$.subscribe((pl) => {
            this.onPlayPlaylist = pl;
        });

        // Init crossfader value
        this.crossFaderValue = 50;
    }


    // Manage mix
    triggerMixLTR(event) {
        console.log('Trigger mix left to right');
        this.currVolLeft = event;
        if (this.videoRight) {
            this.playerRight.playPauseVideo();
            this._playerService.setActivePlayer('right');
            this.initTimerLTR(event);

        } else if (this.onPlayPlaylist && this.onPlayPlaylist.videolist.length > 0) {
            const videoToPlay = this.onPlayPlaylist.videolist[0];
            this._playerService.setPlayerRight(videoToPlay);
            this.videoRight = videoToPlay;
            // this.playerRight.playPauseVideo();
            this._playerService.setActivePlayer('right');
            this.initTimerLTR(event);
        }

    }
    // Init Timer
    initTimerLTR(volume) {
        this.timerControl$ = new Subject<number>();
        this.timer$ = Observable.timer(15000, 1000);
        this.sub = this.timer$.subscribe(t => {
            this.volLeft = this.currVolLeft - 2;
            this.currVolLeft = this.volLeft;

            console.log('============================');
            console.log('PlayerLeft state', this.playerLeft.getPlayerState());
            console.log('LTR => ' + this.currVolLeft);

            if (this.playerLeft.getPlayerState() === 5
            ||  this.playerLeft.getPlayerState() === 2
            ||  this.playerLeft.getPlayerState() === 0
            ||  this.playerLeft.getPlayerState() === 1
            ||  this.playerLeft.getPlayerState() === -1) {
                console.log('=> Stop timer LTR');
                this.stopTimer();
            }
        });
        // console.log('RTL => ' + this.currVolLeft);
    }


    triggerMixRTL(event) {
        console.log('Trigger mix right to left');
        this.currVolRight = event;

        if (this.videoLeft) {
            this.playerLeft.playPauseVideo();
            this._playerService.setActivePlayer('left');
            this.initTimerRTL(event);

        } else if (this.onPlayPlaylist && this.onPlayPlaylist.videolist.length > 0) {
            const videoToPlay = this.onPlayPlaylist.videolist[0];
            this._playerService.setPlayerLeft(videoToPlay);
            this.videoLeft = videoToPlay;
            // this.playerLeft.playPauseVideo();
            this._playerService.setActivePlayer('left');
            this.initTimerRTL(event);
        }
    }
    // Init Timer
    initTimerRTL(volume) {
        this.timerControl$ = new Subject<number>();
        this.timer$ = Observable.timer(15000, 1000);
        this.sub = this.timer$.subscribe(t => {
            this.volRight = this.currVolRight - 2;
            this.currVolRight = this.volRight;

            console.log('============================');
            console.log('PlayerLeft state', this.playerRight.getPlayerState());
            console.log('LTR => ' + this.currVolRight);

            if (this.playerRight.getPlayerState() === 5
            ||  this.playerRight.getPlayerState() === 2
            ||  this.playerRight.getPlayerState() === 1
            ||  this.playerRight.getPlayerState() === 0
            ||  this.playerRight.getPlayerState() === -1) {
                console.log('Stop timer RTL');
                this.stopTimer();
            }
            // console.log('RTL => ' + this.currVolRight);
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

    /*
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
    */
}
