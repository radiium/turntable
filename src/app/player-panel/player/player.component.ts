import { Component, Input, Output, EventEmitter, ChangeDetectorRef,
    OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { PlayerStateService } from 'core/services/player-state.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {

    prevVideoId: string;
    height: number;
    width: number;

    @Input() side: string;

    @Output() playerReady = new EventEmitter<any>();
    @Output() stateChange = new EventEmitter<any>();

    player: YT.Player;
    state: YT.PlayerState;
    hiddenIco: boolean;

    constructor(
    private playerState: PlayerStateService,
    private cdRef: ChangeDetectorRef) {
        this.height = 700;
        this.width = 1000;
        this.hiddenIco = true;
    }

    onPlayPause() {
        if (this.player) {
            this.state = this.player.getPlayerState();
            console.log('state', this.state);
            switch (this.state) {
                case -1:
                    break;
                case 0:
                    break;
                case 1:
                    this.player.pauseVideo();
                    break;
                case 2:
                    this.player.playVideo();
                    break;
                case 3:
                    break;
                case 5:
                    break;
                default:
                    break;
            }

            this.hiddenIco = false;
            setTimeout(() => {
                this.hiddenIco = true;
                this.cdRef.detectChanges();
                console.log('hiddenIco', this)
            }, 500);
        }
    }

    onPlayerReady(player) {
        console.log('sav player ' + this.side, player)
        this.player = player;
        this.playerReady.emit(player);
    }
    onStateChange(event) {
        this.state = event.data;
        this.stateChange.emit(event.data);
    }
}
