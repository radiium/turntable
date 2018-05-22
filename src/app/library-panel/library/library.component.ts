import { Component } from '@angular/core';

import { Playlist, AppState } from 'core/models';
import { DataService } from 'core/services/data.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {

    playlistsList: Array<Playlist> = [];
    appState: AppState;

    constructor(
    private dataSrv: DataService) {
        this.dataSrv.appState$.subscribe((appState) => {
            this.appState = appState;
        });
        this.dataSrv.playlistsList$.subscribe((pll) => {
            this.playlistsList = pll;
        });
    }

    changeDisplayType(evt) {
        this.dataSrv.setDisplayType(evt.value);
    }
}
