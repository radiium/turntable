import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { Video, Playlist } from '../../_core/models';


import { PlayerStateService } from '../../_core/services/player-state.service';
import { PlaylistService } from '../../_core/services/playlist.service';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

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
    @ViewChild('playerLeft') playerLeft;
    volLeft: number;
    speedLeft: any;
    currVolLeft: any;

    // Video right controls
    videoRight;
    @ViewChild('playerRight') playerRight;
    volRight: number;
    speedRight: any;
    currVolRight: any;

    // Cross fader controls
    crossFaderValue: any = 50;
    isRandom: boolean;


    constructor(
        private _playerStateService: PlayerStateService,
        private _playlistService: PlaylistService,
        private _electronService: ElectronService) {

        // Init crossfader value
        this.crossFaderValue = 50;
        this.volLeft = 100;
        this.volRight = 100;
        this._playerStateService.setVolumeLeft(this.volLeft);
        this._playerStateService.setVolumeRight(this.volRight);

        // Get on play playlist
        this._playlistService.onPlayPlaylist$.subscribe((pl) => {
            this.onPlayPlaylist = pl;
        });

        // Get current volume right
        this._playerStateService.isRandom$.subscribe((isRandom) => {
            this.isRandom = isRandom;
        });

        // Get current player left
        this._playerStateService.playerLeft$.subscribe((vl) => {
            this.videoLeft = vl;
        });
        // Get current volume left
        this._playerStateService.volumeLeft$.subscribe((volLeft) => {
            this.volLeft = volLeft;
        });

        // Get current player right
        this._playerStateService.playerRight$.subscribe((vr) => {
            this.videoRight = vr;
        });
        // Get current volume right
        this._playerStateService.volumeRight$.subscribe((volRight) => {
            this.volRight = volRight;
        });
    }

    onChangeCrossFaderValue(value) {
        let valLeft = 0;
        let valRight = 0;
        if (value < 50) {
            valLeft = 100;
            valRight = 100 - ((50 - value) * 2);
        } else if (value === 50) {
            valLeft  = 100;
            valRight = 100;
        } else if (value > 50) {
            valLeft  = 100 - ((value - 50) * 2);
            valRight = 100;
        }

        // console.log('Cross fader value change', 'left=' + valLeft, '/right=' + valRight);
        this._playerStateService.setVolumeLeft(valLeft);
        this._playerStateService.setVolumeRight(valRight);
    }


    // Manage mix
    triggerMixLTR(event) {
        if (event) {
            console.log('Trigger mix left to right');
            if (this.videoRight) {
                this.stopTimer();
                this._playerStateService.setActivePlayer('right');
                this.playerRight.playPauseVideo();
                this.initTimerLTR();

            } else if (this.onPlayPlaylist && this.onPlayPlaylist.videolist.length > 0) {
                this.stopTimer();
                const videoToPlay = this.getVideoToPlay();
                this._playerStateService.setPlayerRight(videoToPlay);
                this._playerStateService.setActivePlayer('right');
                this.playerRight.playPauseVideo();
                this.initTimerLTR();
            }
        }
    }
    // Init Timer
    initTimerLTR() {
        this.timerControl$ = new Subject<number>();
        this.timer$ = Observable.timer(15000, 1000);
        this.sub = this.timer$.subscribe(t => {

            this._playerStateService.setVolumeLeft(this.volLeft - 2);

            console.log('============================');
            console.log('PlayerLeft state', this.playerLeft.getPlayerState());
            console.log('LTR => ' + this.volLeft);

            if (this.playerLeft.getPlayerState() === 5
            ||  this.playerLeft.getPlayerState() === 3
            ||  this.playerLeft.getPlayerState() === 2
            ||  this.playerLeft.getPlayerState() === 0
            ||  this.playerLeft.getPlayerState() === 1
            ||  this.playerLeft.getPlayerState() === -1) {
                console.log('=> Stop timer LTR');
                this.stopTimer();
                this._playerStateService.setVolumeLeft(100);
            }
        });
    }

    triggerMixRTL(event) {
        if (event) {
            console.log('Trigger mix right to left');
            if (this.videoLeft) {
                this.stopTimer();
                this._playerStateService.setActivePlayer('left');
                this.playerLeft.playPauseVideo();
                this.initTimerRTL();

            } else if (this.onPlayPlaylist && this.onPlayPlaylist.videolist.length > 0) {
                this.stopTimer();
                const videoToPlay = this.getVideoToPlay();
                this._playerStateService.setPlayerLeft(videoToPlay);
                this._playerStateService.setActivePlayer('left');
                this.playerLeft.playPauseVideo();
                this.initTimerRTL();
            }
        }
    }
    // Init Timer
    initTimerRTL() {
        this.timerControl$ = new Subject<number>();
        this.timer$ = Observable.timer(15000, 1000);
        this.sub = this.timer$.subscribe(t => {

            this._playerStateService.setVolumeRight(this.volRight - 2);

            console.log('============================');
            console.log('PlayerRight state', this.playerRight.getPlayerState());
            console.log('LTR => ' + this.volRight);

            if (this.playerRight.getPlayerState() === 5
            ||  this.playerRight.getPlayerState() === 2
            ||  this.playerRight.getPlayerState() === 1
            ||  this.playerRight.getPlayerState() === 0
            ||  this.playerRight.getPlayerState() === -1) {
                console.log('Stop timer RTL');
                this.stopTimer();
                this._playerStateService.setVolumeRight(100);
            }
        });
    }

    // Stop timer
    stopTimer() {
        this.timerControl$.next();
        if (this.sub) { this.sub.unsubscribe(); }
        this.timer$ = Observable.empty();
    }

    setIsRandom() {
        this._playerStateService.setIsRandom(this.isRandom ? false : true);
    }

    getVideoToPlay() {
        let videoToPlay = null;
        if (this.isRandom) {
            const randomIndex = Math.floor(Math.random() * this.onPlayPlaylist.videolist.length);
            console.log('isRandom true => randomIndex=', randomIndex);
            videoToPlay = this.onPlayPlaylist.videolist[randomIndex];
        } else {
            console.log('isRandom false', );
            videoToPlay = this.onPlayPlaylist.videolist[0];
        }
        return videoToPlay;
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
