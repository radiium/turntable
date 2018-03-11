import { Component, OnInit, Input, OnChanges, SimpleChanges,
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { PlayerState } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';

@Component({
    selector: 'app-player-control',
    templateUrl: './player-control.component.html',
    styleUrls: ['./player-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerControlComponent implements OnInit {

    @Input() side: string;
    @Input() playerState: PlayerState;
    player: YT.Player;

    currentVolume;
    currentVolumeIcon: string;
    volumeIconList: Array<string> = [
        'volume_up',
        'volume_down',
        'volume_off'
    ];

    constructor(
    private cdRef: ChangeDetectorRef,
    private playerStateService: PlayerStateService
    ) {
        this.currentVolumeIcon = this.volumeIconList[0]

    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.player && window['YT'] && changes.playerState) {
            // this.player = window['YT'].get(this.playerState.playerId);
            this.player = this.playerStateService.getPlayer(this.playerState.playerId);
        }

        if (changes.playerState && changes.playerState.currentValue) {
            this.currentVolume = this.playerState.volume;
            this.updateVolumeIcon();
            this.cdRef.detectChanges();
        }
    }

    updateVolumeIcon() {
        if (this.player) {

            const isMuted = this.player.isMuted();
            const volume = this.player.getVolume();

            if (!isMuted) {
                this.currentVolumeIcon = this.volumeIconList[2];

            } else {
                if (volume < 1) {
                    this.currentVolumeIcon = this.volumeIconList[2];
                }
                if (volume > 0 && volume < 50) {
                    this.currentVolumeIcon = this.volumeIconList[1];

                } else if (volume >= 50 && volume <= 100) {
                    this.currentVolumeIcon = this.volumeIconList[0];
                }
            }
        }
    }

    setMute(mute: boolean) {
        if (this.player) {
            if (mute) {
                this.player.mute();
            } else {
                this.player.unMute();
            }
            this.updateVolumeIcon();
        }
    }

    controlVolume() {
        if (this.player) {
            this.setMute(!this.player.isMuted());
        }
    }



    onPlayPause() {

    }

    hasPrev() {
    return false;
    }

    hasNext() {
    return true;
    }

}
