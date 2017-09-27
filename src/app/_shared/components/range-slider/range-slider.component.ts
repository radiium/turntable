import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {

    @Input()  isPlayerReady: boolean;
    @Input()  name: string;
    @Input()  side: string;
    @Input()  step: number;
    @Input()  min: number;
    @Input()  max: number;
    @Input()  default: number;
    @Input()  value: number;
    @Output() valueChange: EventEmitter<number>;

    constructor() {
        this.valueChange = new EventEmitter<number>();
    }

    ngOnInit() {
        this.value = this.default;
    }

    onInputChange(e) {
        if (!this.isPlayerReady) {
            this.value = this.default;
            e.target.value = this.default;
            return;
        }

        this.value = e.target.value;
        this.valueChange.emit(this.value);
    }

    up() {
        if (!this.isPlayerReady) { return; }

        this.value = this.value + this.step;
        if (this.value >= this.max) {
            this.value = this.max;
        } else if (this.value <= this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    }

    down() {
        if (!this.isPlayerReady) { return; }

        this.value = this.value - this.step;
        if (this.value >= this.max) {
            this.value = this.max;
        } else if (this.value <= this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    }
}
