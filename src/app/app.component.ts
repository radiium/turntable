import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TabsService } from './_core/services/tabs.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    selectedTab: any;

    constructor(private _tabsService: TabsService) {
        // Get selected tab
        this._tabsService.selectedTab$.subscribe((st) => {
            this.selectedTab = st;
        });
    }
}
