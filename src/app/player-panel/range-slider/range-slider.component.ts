import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {

    @Input()  name: number;
    @Input()  min: number;
    @Input()  max: number;
    @Input()  step: number;
    @Input()  value: number;

    @Output() onValueChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    onInputChange(event) {
        this.changeValue(event.target.value);
    }

    increment() {
        let value = this.value + this.step;
        if (value >= this.max) {
            value = this.max;
        } else if (value <= this.min) {
            value = this.min;
        }
        this.changeValue(value);
    }

    decrement() {
        let value = this.value - this.step;
        if (value >= this.max) {
            value = this.max;
        } else if (value <= this.min) {
            value = this.min;
        }
        this.changeValue(value);
    }

    changeValue(value) {
        this.value = value;
        this.onValueChange.emit(value);
    }
}
