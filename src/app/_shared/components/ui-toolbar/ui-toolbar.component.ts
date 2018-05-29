import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './ui-toolbar.component.html',
    styleUrls: ['./ui-toolbar.component.scss']
})
export class UiToolbarComponent {

    @Input() width: string;
    @Input() height: string;
    @Input() padding: string;
    @Input() margin: string;

    constructor() {
    }
}
