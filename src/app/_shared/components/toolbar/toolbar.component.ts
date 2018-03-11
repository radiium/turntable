import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input('width') width: string;
    @Input('height') height: string;
    @Input('padding') padding: string;
    @Input('margin') margin: string;

    constructor() {
    }

    ngOnInit() {
    }

}
