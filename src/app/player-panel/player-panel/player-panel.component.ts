import { Component, OnInit, Input, Output, EventEmitter,
    ViewChild, ElementRef, ApplicationRef,
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable ,  Subscription ,  Subject } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import * as _ from 'lodash';

import { PlaylistItem, Playlist, PlayerState, PlayerPanelState, AppState } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { ElectronService } from 'ngx-electron';
import { PlaylistService } from 'core/services/playlist.service';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPanelComponent implements OnInit {

    @ViewChild('playerListScrollContainer') set container(scrollContainer: ElementRef) {
        this.dndSrv.playerListContainer = scrollContainer;
    }

    // playlistsList: Playlist[];
    canAddToPlaylist: boolean;

    onDisplayPl: string;
    isDoublePlayer: boolean;
    playerPanelState: PlayerPanelState;

    playerLeft: YT.Player;
    playerStateLeft: PlayerState;

    playerRight: YT.Player;
    playerStateRight: PlayerState;

    // Cross fader controls
    crossFaderValue: number;

    appState: AppState;

    onPlayList: Playlist;
    historicList: Playlist;

    playListConfig = {
        draggable: true,
        displayType: 'list',
        dragBagName: 'videolistBag',
        showShadow: true,
        attr: {
            copy: false,
            acceptDrop: true,
            playlistId: undefined,
            from: 'onplay'
        }
    };

    historicListConfig = {
        draggable: true,
        displayType: 'list',
        dragBagName: 'videolistBag',
        // showShadow: true,
        attr: {
            copy: true,
            acceptDrop: false,
            playlistId: undefined,
            from: 'historic'
        }
    };

    constructor(
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private dndSrv: DndService,
    private plSrv: PlaylistService,
    private dataSrv: DataService,
    private playerState: PlayerStateService,
    private Electron: ElectronService) {
        this.onDisplayPl = 'playlist';
        this.isDoublePlayer = true;
        this.crossFaderValue = 50;
        this.canAddToPlaylist = false;
    }

    ngOnInit() {
        this.dataSrv.playlistsList$.subscribe((data) => {
            // this.playlistsList = data;
            this.canAddToPlaylist = data.length > 0;
            // this.cdRef.markForCheck();
        });

        this.playerState.playerPanelState$.subscribe((data) => {
            this.playerPanelState = data;
            // this.cdRef.markForCheck();
        });

        this.playerState.playerStateLeft$.subscribe((data) => {
            this.playerStateLeft = data;
            // this.cdRef.markForCheck();
        });

        this.playerState.playerLeft$.subscribe((data) => {
            this.playerLeft = data;
            // this.cdRef.markForCheck();
        });

        this.playerState.playerStateRight$.subscribe((data) => {
            this.playerStateRight = data;
            // this.cdRef.markForCheck();
        });

        this.playerState.playerRight$.subscribe((data) => {
            this.playerRight = data;
            // this.cdRef.markForCheck();
        });

        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            // this.cdRef.markForCheck();
        });

        this.dataSrv.onPlayList$.subscribe((data) => {
            this.onPlayList = _.cloneDeep(data);
            // this.cdRef.detectChanges();
        });

        this.dataSrv.historicList$.subscribe((data) => {
            this.historicList = _.cloneDeep(data);
            // this.cdRef.detectChanges();
        });
    }


    // ------------------------------------------------------------------------
    // Player Left
    savePlayerLeft(player: YT.Player) {
        this.playerStateLeft.playerId = player['a'].id;
        this.playerState.setPlayerLeft(player);
        this.playerState.setPlayerStateLeft(this.playerStateLeft);
    }

    onStateChangeLeft(state: YT.PlayerState) {
        this.playerState.setStateLeft(state);
    }

    onVolumeChangeLeft(volume: number) {
        this.playerState.setVolumeLeft(volume);
    }

    onSpeedChangeLeft(speed: number) {
        this.playerState.setSpeedLeft(speed);
    }

    emptyOnPlayList() {
        this.plSrv.deletePlayerList()
    }

    createPlaylistFromOnPlayList() {
        // this.plSrv.createPlaylist(this.onPlayList);
    }

    emptyHistoricList() {
        this.plSrv.deleteHistoricList()
    }

    createPlaylistFromHistoricList() {
        // this.plSrv.createPlaylist(this.historicList);
    }

    // ------------------------------------------------------------------------
    // Player Right
    savePlayerRight(player: YT.Player) {
        this.playerStateRight.playerId = player['a'].id;
        this.playerState.setPlayerRight(player);
        this.playerState.setPlayerStateRight(this.playerStateRight);
    }

    onStateChangeRight(state: YT.PlayerState) {
        this.playerState.setStateRight(state);
    }

    onVolumeChangeRight(volume: number) {
        this.playerState.setVolumeRight(volume);
    }

    onSpeedChangeRight(speed: number) {
        this.playerState.setSpeedRight(speed);
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

        this.playerState.setVolumeLeft(valLeft);
        this.playerState.setVolumeRight(valRight);
    }

    playVideo(video: PlaylistItem, index: number) {
        this.playerState.playVideo(video, index);
    }

    onRandom() {
        const isRandom = !this.playerPanelState.isRandom;
        this.playerState.setRandom(isRandom);
    }

    onRepeat() {
        const isRepeat = !this.playerPanelState.isRepeat;
        this.playerState.setRepeat(isRepeat);
    }

    onNearEnd(side: string) {
        // console.log('=> Player ' + side + ' is near end!');
        this.playerState.playVideoAuto(side);
    }

    setFulscreenPlayer() {

    }

    // ------------------------------------------------------------------------
    // Track onPlay list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id; // index;
    }
}
