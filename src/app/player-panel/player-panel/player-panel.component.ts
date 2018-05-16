import { Component, OnInit, Input, Output, EventEmitter,
    ViewChild, ElementRef, ApplicationRef,
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable ,  Subscription ,  Subject } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import * as _ from 'lodash';

import { PlaylistItem, Playlist, PlayerState, PlayerPanelState } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPanelComponent implements OnInit {

    @ViewChild('playerListScrollContainer') set container(scrollContainer: ElementRef) {
        this.dndService.playerListContainer = scrollContainer;
    }

    onDisplayPl: string;
    isDoublePlayer: boolean;
    playerPanelState: PlayerPanelState;

    playerLeft: YT.Player;
    playerStateLeft: PlayerState;

    playerRight: YT.Player;
    playerStateRight: PlayerState;

    // Cross fader controls
    crossFaderValue: number;


    constructor(
    // private cd: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private dndService: DndService,
    private dataService: DataService,
    private playerState: PlayerStateService,
    private Electron: ElectronService) {
        this.onDisplayPl = 'playlist';
        this.isDoublePlayer = true;
        this.crossFaderValue = 50;
    }

    ngOnInit() {
        this.playerState.playerPanelState$.subscribe((data) => {
            this.playerPanelState = data;
            // this.appRef.tick();
            // this.cd.markForCheck();
        });

        // Get player and player state left
        this.playerState.playerStateLeft$.subscribe((data) => {
            this.playerStateLeft = data;
        });
        this.playerState.playerLeft$.subscribe((data) => {
            this.playerLeft = data;
        });

        // Get player and player state right
        this.playerState.playerStateRight$.subscribe((data) => {
            this.playerStateRight = data;
        });
        this.playerState.playerRight$.subscribe((data) => {
            this.playerRight = data;
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


    // ------------------------------------------------------------------------
    // Playlist control
    deleteVideo(video: PlaylistItem, index: number) {
        this.playerPanelState.playlist.splice(index, 1);
        this.playerState.setPlayerPanelState(_.cloneDeep(this.playerPanelState));
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
        (<HTMLInputElement>document.getElementById('onPlayItem-' + (this.playerPanelState.playlist.length - 1)))
            .scrollIntoView({behavior: 'smooth'});
    }

    move(from, to) {
        if (to === from) {
            return;
        }

        const target = this.playerPanelState.playlist[from];
        const increment = to < from ? -1 : 1;

        for (let k = from; k !== to; k += increment) {
            this.playerPanelState.playlist[k] = this.playerPanelState.playlist[k + increment];
        }

        this.playerPanelState.playlist[to] = target;
        this.playerState.setPlayerPanelState(_.cloneDeep(this.playerPanelState));
    }

    // ------------------------------------------------------------------------
    // Track onPlay list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id; // index;
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
}
