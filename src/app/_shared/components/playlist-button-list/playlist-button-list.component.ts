import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, AppState, PlaylistItem } from 'core/models';
import { DataService } from 'core/services/data.service';
import { PlaylistService } from 'core/services/playlist.service';
import { DndService } from 'core/services/dnd.service';
import { DragImage } from 'shared/modules/ngx-dnd/ngx-dnd.config';
import { Base64Images } from 'core/models/base64-images';
import { DragDropService } from 'shared/modules/ngx-dnd/ngx-dnd.service';

@Component({
    selector: 'app-playlist-button-list',
    templateUrl: './playlist-button-list.component.html',
    styleUrls: ['./playlist-button-list.component.scss']
})
export class PlaylistButtonListComponent implements AfterViewInit {

    playlistsList: Playlist[];
    appState: AppState;
    dragImage: DragImage;

    @ViewChild('scrollContainer') scrollContainer: ElementRef;

    constructor(
    private dataSrv: DataService,
    private plSrv: PlaylistService,
    // private dnd: DndService,
        private zone: NgZone
    ) {

        this.dragImage = new DragImage(Base64Images.playlist, 20, 20);

        this.dataSrv.playlistsList$.subscribe(datalist => {
            this.playlistsList = datalist;
        });

        this.dataSrv.appState$.subscribe(appState => {
            this.appState = appState;
        });
    }

    ngAfterViewInit() {
        // this.dnd.plButtonContainer = this.scrollContainer;
    }

    selectPlaylist(playlist: Playlist) {
        this.plSrv.showPlaylist(playlist);
    }

    onDropSuccess(event, plId) {
        this.plSrv.addToPlaylistOne(event.dragData.video, plId);
    }

    allowDrop(plId) {
        return (dragData: any) => {
            return dragData.type === 'PlayListItem'
                && dragData.from !== plId;
        };
    }

    trackByFn(index, item) {
        return index;
    }
}
