import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {


    @Input()
    name: string;

    @Input()
    side: string;

    @Input()
    step: number;

    @Input()
    min: number;

    @Input()
    max: number;

    @Input()
    value: number;

    @Input()
    default: number;

    @Output()
    valueChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
        this.value = this.default;
    }

    up() {
        this.value = this.value + this.step;
        if (this.value >= this.max) {
            this.value = this.max;
        } else if (this.value <= this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    }

    down() {
        this.value = this.value - this.step;
        if (this.value >= this.max) {
            this.value = this.max;
        } else if (this.value <= this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    }

}
