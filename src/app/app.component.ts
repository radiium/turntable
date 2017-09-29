import { Component, OnInit } from '@angular/core';
import { TabsService } from './_core/services/tabs.service';
import { Observable } from 'rxjs/Observable';

import { YoutubePlayerService } from './_shared/modules/ng2-youtube-player/services/youtube-player.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    selectedTab: any;
    isLoading: Boolean = false;

    constructor(
    public ytService: YoutubePlayerService,
    private _tabsService: TabsService) {

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
}
