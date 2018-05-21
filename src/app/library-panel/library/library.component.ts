import { Component, OnInit} from '@angular/core';

import { Playlist, AppState } from 'core/models';
import { DataService } from 'core/services/data.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    playlistsList: Array<Playlist> = [];
    appState: AppState;

    constructor(
    private dataService: DataService) {
    }

    ngOnInit() {
        // App State
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
        });

        // Get playlist list
        this.dataService.playlistsList$.subscribe((data) => {
            console.log('playlistsList')
            this.playlistsList = data;
        });
    }

    // Change display type
    changeDisplayType(evt) {
        this.dataService.setDisplayType(evt.value);
    }
}
