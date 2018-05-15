import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input() width: string;
    @Input() height: string;
    @Input() padding: string;
    @Input() margin: string;

    constructor() {
    }

    ngOnInit() {
    }

}
