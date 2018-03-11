import { Component, OnInit, Input, Output, EventEmitter, ViewChild,
    ElementRef, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { Video, Playlist, PlayerState, PlayerPanelState } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPanelComponent implements OnInit {

    @ViewChild('playerListScrollContainer') set container(scrollContainer: ElementRef) {
        this.dndService.playerListContainer = scrollContainer;
    }

    onDisplayPl: string;
    isDoublePlayer: boolean;

    playerPanelState: PlayerPanelState;

    playerStateLeft: PlayerState;
    playerStateRight: PlayerState;

    /*
    // Timer
    timerControl$: Subject<number> = new Subject<number>();
    timer$;
    sub: Subscription;

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
    */

    constructor(
    private cd: ChangeDetectorRef,
    private dndService: DndService,
    private dataService: DataService,
    private playerState: PlayerStateService,
    private Electron: ElectronService) {

        this.onDisplayPl = 'playlist';
        this.isDoublePlayer = true;

        /*
        // Init crossfader value
        this.crossFaderValue = 50;
        this.volLeft = 100;
        this.volRight = 100;
        this.speedLeft = 1;
        this.speedRight = 1;
        this._playerStateService.setVolumeLeft(this.volLeft);
        this._playerStateService.setVolumeRight(this.volRight);
        */
    }

    ngOnInit() {
        this.playerState.playerPanelState$.subscribe((data) => {
            this.playerPanelState = data;
            // console.log('playerPanelState', data);
            this.cd.markForCheck();
        });

        // Get current player right
        this.playerState.playerStateLeft$.subscribe((data) => {
            this.playerStateLeft = data;
        });
        // Get current volume right
        this.playerState.playerStateRight$.subscribe((data) => {
            this.playerStateRight = data;
        });
    }

    getDuration() {
        const test = this.playerStateLeft.player.getDuration();
    }


    // ------------------------------------------------------------------------
    // Player Left
    savePlayerLeft(player: YT.Player) {
        this.playerStateLeft.player = player;
        this.playerState.setPlayerStateLeft(this.playerStateLeft);
    }

    onStateChangeLeft(state: YT.PlayerState) {
        this.playerStateLeft.state = state;
        this.playerState.setPlayerStateLeft(this.playerStateLeft);
    }

    onVolumeChangeLeft(volume: number) {
        this.playerStateLeft.volume = volume;
        this.playerState.setPlayerStateLeft(this.playerStateLeft);
    }

    onSpeedChangeLeft(speed: number) {
        this.playerStateLeft.speed = speed;
        this.playerState.setPlayerStateLeft(this.playerStateLeft);
    }


    // ------------------------------------------------------------------------
    // Player Right
    savePlayerRight(player: YT.Player) {
        this.playerStateRight.player = player;
        this.playerState.setPlayerStateRight(this.playerStateRight);
    }

    onStateChangeRight(state: YT.PlayerState) {
        this.playerStateRight.state = state;
        this.playerState.setPlayerStateRight(this.playerStateRight);
    }

    onVolumeChangeRight(volume: number) {
        this.playerStateRight.volume = volume;
        this.playerState.setPlayerStateRight(this.playerStateRight);
    }

    onSpeedChangeRight(speed: number) {
        this.playerStateRight.speed = speed;
        this.playerState.setPlayerStateRight(this.playerStateRight);
    }


    // ------------------------------------------------------------------------
    // Playlist control
    deleteVideo(video: Video) {
        const updatedList = _.filter(this.playerPanelState.playlist, (v) => {
            return v.id !== video.id;
        });
        this.dataService.setOnPlayList(updatedList);
    }

    moveToTop(index: number) {
        this.move(index, 0);
        (<HTMLInputElement>document.getElementById('onPlayItem-' + 0)).scrollIntoView({behavior: 'smooth'});
    }

    up(index: number, el) {
        this.move(index, index - 1);
        (<HTMLInputElement>document.getElementById('onPlayItem-' + (index - 1))).scrollIntoView({behavior: 'smooth'});
    }

    down(index: number, el) {
        this.move(index, index + 1);
        (<HTMLInputElement>document.getElementById('onPlayItem-' + (index + 1))).scrollIntoView({behavior: 'smooth'});
    }

    moveToBottom(index: number, el) {
        this.move(index, this.playerPanelState.playlist.length - 1);
        (<HTMLInputElement>document.getElementById('onPlayItem-' + (this.playerPanelState.playlist.length - 1))).scrollIntoView({behavior: 'smooth'});
    }

    move(from, to) {
        if( to === from ) return;

        var target = this.playerPanelState.playlist[from];
        var increment = to < from ? -1 : 1;

        for (var k = from; k != to; k += increment) {
            this.playerPanelState.playlist[k] = this.playerPanelState.playlist[k + increment];
        }

        this.playerPanelState.playlist[to] = target;
        this.dataService.setOnPlayList(this.playerPanelState.playlist);
    }

    // ------------------------------------------------------------------------
    // Track onPlay list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id; // index;
    }


    /*
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

            } else if (this.onPlayList && this.onPlayList.length > 0) {
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

            } else if (this.onPlayList && this.onPlayList.length > 0) {
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
        this.timer$ = new EmptyObservable();
    }

    setIsRandom() {
        this._playerStateService.setIsRandom(this.isRandom ? false : true);
    }

    getVideoToPlay() {
        let videoToPlay = null;
        if (this.isRandom) {
            const randomIndex = Math.floor(Math.random() * this.onPlayList.length);
            console.log('isRandom true => randomIndex=', randomIndex);
            videoToPlay = this.onPlayList[randomIndex];
        } else {
            console.log('isRandom false', );
            videoToPlay = this.onPlayList[0];
        }
        return videoToPlay;
    }


    public playPingPong() {
        if (this.Electron.isElectronApp) {
            // const pong: string = this.Electron.ipcRenderer.sendSync('ping');
            // console.log(pong);

            console.log(this.Electron.ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

            this.Electron.ipcRenderer.on('asynchronous-reply', (event, arg) => {
                console.log(arg); // prints "pong"
            });
            this.Electron.ipcRenderer.send('asynchronous-message', 'ping');
        }
    }
    send() {
        this.Electron.ipcRenderer.send('asynchronous-message', {test: 'test'});
    }
    receive() {
        this.Electron.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg); // prints "pong"
        });
    }
    */
}
