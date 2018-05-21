import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import * as _ from 'lodash';

import { Playlist, AppState } from 'core/models';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'app-playlist-button-list',
    templateUrl: './playlist-button-list.component.html',
    styleUrls: ['./playlist-button-list.component.scss']
})
export class PlaylistButtonListComponent implements OnInit, AfterViewInit {

    playlistsList: Playlist[];
    onSelectPL: string;
    appState: AppState;

    @ViewChild('scrollContainer') scrollContainer: ElementRef;
    @ViewChildren('plBtnList') ngforItemsList: QueryList<any>;

    constructor(
    private data: DataService,
    private dnd: DndService,
    ) {
        this.data.playlistsList$.subscribe(data => {
            this.playlistsList = data;
        });

        this.data.onSelectPL$.subscribe(data => {
            this.onSelectPL = data;
        });

        this.data.appState$.subscribe(data => {
            this.appState = data;
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.dnd.plButtonContainer = this.scrollContainer;

        this.ngforItemsList.changes.subscribe(data => {
            const btnRefList = _.map(this.ngforItemsList.toArray(), (btnEl) => btnEl.nativeElement);
            // this.dnd.initVideoListBag(btnRefList);
            // this.dnd.initVideoListBag();
        });
    }

    selectPlaylist(plId: string) {
        this.data.setOnSelectPL(plId);
        this.data.setSelectedTab(4);
    }

    @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

    openContextMenu(event: Event) {
        event.preventDefault();
        console.log('this.contextMenu', this.contextMenu, event);
        this.contextMenu.openMenu();
        return false;
    }

    playPlaylist() {
        console.log('playPlaylist');
    }
    addToCurrentPlaylist() {
        console.log('addToCurrentPlaylist');
    }
    deletePlaylist() {
        console.log('deletePlaylist');
    }
    editPlaylist() {
        console.log('editPlaylist');
    }

    trackByFn(index, item) {
        return index;
    }
}
