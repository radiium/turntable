import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { PlayerStateService } from '../../../_core/services/player-state.service';

@Component({
    selector: 'app-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

    @Input()  isPlayerReady: boolean;
    @Input()  name: string;
    @Input()  side: string;
    @Input()  step: number;
    @Input()  min: number;
    @Input()  max: number;
    @Input()  default: number;

    value: number;

    constructor(
    private _playerStateService: PlayerStateService) {
    }

    ngOnInit() {
        this.value = this.default;

        if (this.name === 'Vol') {
            if (this.side === 'left') {
                this._playerStateService.volumeLeft$.subscribe((value) => {
                    this.value = value;
                });

            } else if (this.side === 'right') {
                this._playerStateService.volumeRight$.subscribe((value) => {
                    this.value = value;
                });
            }

        } else if (this.name === 'Speed') {
            if (this.side === 'left') {
                this._playerStateService.speedLeft$.subscribe((value) => {
                    this.value = value;
                });

            } else if (this.side === 'right') {
                this._playerStateService.speedRight$.subscribe((value) => {
                    this.value = value;
                });
            }
        }
    }

    onInputChange(e) {
        if (!this.isPlayerReady) {
            this.changeValue(this.default);
            return;
        }
        this.changeValue(e.target.value);
    }

    up() {
        if (!this.isPlayerReady) { return; }

        let value = this.value + this.step;
        if (value >= this.max) {
            value = this.max;

        } else if (value <= this.min) {
            value = this.min;
        }
        this.changeValue(value);
    }

    down() {
        if (!this.isPlayerReady) { return; }

        let value = this.value - this.step;
        if (value >= this.max) {
            value = this.max;

        } else if (value <= this.min) {
            value = this.min;
        }
        this.changeValue(value);
    }

    changeValue(value) {
        if (this.name === 'Vol') {
            if (this.side === 'left') {
                this._playerStateService.setVolumeLeft(value);

            } else if (this.side === 'right') {
                this._playerStateService.setVolumeRight(value);
            }

        } else if (this.name === 'Speed') {
            if (this.side === 'left') {
                this._playerStateService.setSpeedLeft(value);

            } else if (this.side === 'right') {
                this._playerStateService.setSpeedRight(value);
            }
        }
    }
}
