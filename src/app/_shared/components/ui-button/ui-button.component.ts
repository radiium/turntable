import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ui-button',
    templateUrl: './ui-button.component.html',
    styleUrls: ['./ui-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent implements OnInit {


    @Input() text: string;
    @Input() icon: string;
    @Input() disabled: boolean;

    constructor() { }

    ngOnInit() {
    }

}
