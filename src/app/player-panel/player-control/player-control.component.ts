import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PlayerState } from 'core/models';

@Component({
    selector: 'app-player-control',
    templateUrl: './player-control.component.html',
    styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

    @Input() playerState: PlayerState;

    isMuted: boolean;
    currentVolume;
    currentVolumeIcon: string;
    volumeIconList: Array<string> = [
        'volume_up',
        'volume_down',
        'volume_off'
    ];

    constructor() {
        this.currentVolumeIcon = this.volumeIconList[0]
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.playerState && changes.playerState.currentValue) {

            if (this.playerState.player) {
                this.isMuted = this.playerState.player.isMuted();
                this.currentVolume = this.playerState.volume;
                this.updateVolumeIcon();
            }
        }
    }

    updateVolumeIcon() {
        if (this.checkPlayerState()) {
            if (this.isMuted || this.currentVolume < 1) {
                this.currentVolumeIcon = this.volumeIconList[2];
            } else {
                if (this.currentVolume > 0 && this.currentVolume < 50) {
                    this.currentVolumeIcon = this.volumeIconList[1];
                } else if (this.currentVolume >= 50 && this.currentVolume <= 100) {
                    this.currentVolumeIcon = this.volumeIconList[0];
                }
            }
        }
    }

    setVolume(isMuted) {
        if (this.checkPlayerState()) {
            console.log('setVolume', isMuted)
            if (isMuted) {
                console.log('mute')
                this.playerState.player.mute();
            } else {
                console.log('mute')
                this.playerState.player.unMute();
            }
            this.isMuted = this.playerState.player.isMuted();
            this.updateVolumeIcon();
        }
    }

    controlVolume() {
        if (this.checkPlayerState()) {
            this.setVolume(!this.playerState.player.isMuted());
        }
    }

    checkPlayerState() {
        if (this.playerState && this.playerState.player) {
            return true;
        }
        return false;
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
