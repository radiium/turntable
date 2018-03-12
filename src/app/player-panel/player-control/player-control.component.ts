import { Component, Input, OnChanges, SimpleChanges,
    ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { PlayerState } from 'core/models';

@Component({
    selector: 'app-player-control',
    templateUrl: './player-control.component.html',
    styleUrls: ['./player-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerControlComponent {

    @Input() side: string;
    @Input() player: any; // YT.Player => error YT is defined;
    @Input() playerState: PlayerState;

    isOnPlay: boolean;
    currentVolumeIcon: string;
    volumeIconList: Array<string> = [
        'volume_up',
        'volume_down',
        'volume_off'
    ];

    constructor(
    private cdRef: ChangeDetectorRef) {
        this.isOnPlay = false;
        this.currentVolumeIcon = this.volumeIconList[0]
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.playerState && changes.playerState.currentValue) {
            this.isOnPlay = this.playerState.state == 1;
            this.setMute(this.playerState.volume == 0);
            this.cdRef.detectChanges();
        }
    }

    updateVolumeIcon() {
        if (this.playerState.volume == 0) {
            this.currentVolumeIcon = this.volumeIconList[2];
         } else if (this.playerState.volume > 0 && this.playerState.volume < 50) {
             this.currentVolumeIcon = this.volumeIconList[1];

         } else if (this.playerState.volume >= 50 && this.playerState.volume <= 100) {
             this.currentVolumeIcon = this.volumeIconList[0];
         }
    }

    setMute(mute: boolean) {
        if (this.player) {
            if (mute) {
                this.player.mute();
                this.currentVolumeIcon = this.volumeIconList[2];
            } else {
                this.player.unMute();
                this.updateVolumeIcon();
            }
        }
    }

    muteUnmute() {
        if (this.player) {
            this.setMute(!this.player.isMuted());
        }
    }

    replay() {
        if (this.player) {
            this.player.seekTo(0);
        }
    }

    onPlayPause() {
        if (this.player) {
            if (this.playerState.state == 1) {
                this.player.pauseVideo();
                this.isOnPlay = false;
            } else if (this.playerState.state == 2) {
                this.player.playVideo();
                this.isOnPlay = true;
            }
        }
    }

    hasPrev() {
    return false;
    }

    hasNext() {
    return true;
    }

}
