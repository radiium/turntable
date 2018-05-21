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
    private dataService: DataService) {
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
        });
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });
    }

    changeDisplayType(evt) {
        this.dataService.setDisplayType(evt.value);
    }
}
