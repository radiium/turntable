import { Component, OnInit } from '@angular/core';
import { TabsService } from './_core/services/tabs.service';
import { Observable } from 'rxjs/Observable';

import { OnlineService } from './_core/services/online.service';
import { YoutubePlayerService } from './_shared/modules/ng2-youtube-player/services/youtube-player.service';

import * as en from './i18n/en.json';
import * as fr from './i18n/fr.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    selectedTab: any;
    isLoading: Boolean = false;
    isOnline: Boolean = false;

    defaultUserSettings = {
        theme: 'light',
    };

    constructor(
    private _onlineService: OnlineService,
    public ytService: YoutubePlayerService,
    private _tabsService: TabsService) {

        // Check internet connection
        this._onlineService.isOnline$.subscribe((isOnline) => {
            this.isOnline = isOnline;
        });

        // TODO rework an 'REAL' app loader
        Observable.timer(3000).subscribe((res) => {
            this.isLoading = false;
        });

        // Get selected tab
        this._tabsService.selectedTab$.subscribe((st) => {
            this.selectedTab = st;
        });
        this._tabsService.setSelectedTab(1);
    }

    ngOnInit() {}

    initUserSettings() {
    }
}
