import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, AppState } from 'core/models';
import { DataService } from 'core/services/data.service';
import { PlaylistService } from 'core/services/playlist.service';
import { DndService } from 'core/services/dnd.service';

@Component({
    selector: 'app-playlist-button-list',
    templateUrl: './playlist-button-list.component.html',
    styleUrls: ['./playlist-button-list.component.scss']
})
export class PlaylistButtonListComponent implements AfterViewInit {

    playlistsList: Playlist[];
    appState: AppState;

    @ViewChild('scrollContainer') scrollContainer: ElementRef;

    constructor(
    private dataSrv: DataService,
    private plSrv: PlaylistService,
    private dnd: DndService,
    ) {
        this.dataSrv.playlistsList$.subscribe(datalist => {
            this.playlistsList = datalist;
        });

        this.dataSrv.appState$.subscribe(appState => {
            this.appState = appState;
        });
    }

    ngAfterViewInit() {
        this.dnd.plButtonContainer = this.scrollContainer;
    }

    selectPlaylist(playlist: Playlist) {
        this.plSrv.showPlaylist(playlist);
    }

    trackByFn(index, item) {
        return index;
    }
}
