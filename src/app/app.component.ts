import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ElectronService } from 'ngx-electron';

import { AppStateService } from './_core/services/app-state.service';
import { AuthService } from './_core/services/youtube';
import { DataService } from './_core/services/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    selectedTab: any;

    constructor(
    private appState: AppStateService,
    private dataService: DataService,
    private Electron: ElectronService,
    private authService: AuthService) {

        this.dataService.setSelectedTab(0);
        this.dataService.selectedTab$.subscribe((st) => {
            this.selectedTab = st;
        });

        this.appState.loadAppState();
    }

    ngOnInit() {
    }

    onTabChange(event) {
        this.dataService.setSelectedTab(event.index);
    }
}
