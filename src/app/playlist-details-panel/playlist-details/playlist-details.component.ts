import { Component, OnInit, ViewChild, ElementRef, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Playlist, PlaylistItem, AppState } from 'core/models';
import { DataService } from 'core/services/data.service';
import { AppStateService } from 'core/services/app-state.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { PlaylistService } from 'core/services/playlist.service';
import { DndService } from 'core/services/dnd.service';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistDetailsComponent implements OnInit {

    playlist: Playlist;
    playlistsList: Playlist[];
    onPlayList: PlaylistItem[];
    videoList: PlaylistItem[];
    onEdit: boolean;

    canAddToPlaylist: boolean = false;

    title: string;
    description: string;
    privacyStatus: string;

    appState: AppState;

    videoListConfig = {
        draggable: true,
        displayType: 'list',
        dragBagName: 'videolistBag',
        showShadow: true,
        attr: {
            copy: false,
            acceptDrop: true,
            playlistId: '',
            from: 'detail'
        }
    };


    @ViewChild('itemControl') itemControl;
    @ViewChild('pldScrollContainer') set container(scrollContainer: ElementRef) {
        this.dnd.plDetailContainer = scrollContainer;
    }

    constructor(
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private dataService: DataService,
    private appStateService: AppStateService,
    private playerState: PlayerStateService,
    private dnd: DndService,
    public plSrv: PlaylistService,
    public dialog: MatDialog) {

        this.onEdit = false;
        this.title = '';
        this.description = '';
        this.privacyStatus = '';

        // Get selected playlist
        this.dataService.onSelectPL$.subscribe((data) => {
            this.playlist = _.find(this.playlistsList, { id: data });
            if (this.playlist) {
                this.videoList = this.playlist.videolist;
            } else {
                this.playlist = null;
                this.videoList = [];
            }
            this.updateState(false);
            this.cdRef.markForCheck();
            // this.appRef.tick();
        });

        // Get playlist list
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
            if (this.playlist) {
                this.playlist = _.find(this.playlistsList, { id: this.playlist.id });
            } else if (!this.playlist && this.playlistsList.length > 0) {
                this.playlist = this.playlistsList[0];
                this.videoList = this.playlist.videolist;
            } else {
                this.playlist = null;
                this.videoList = [];
            }
            this.canAddToPlaylist = data.length > 1;
            this.cdRef.detectChanges();
        });

        // App State
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
            this.cdRef.markForCheck();
        });
    }

    ngOnInit() {
    }



    updateState(isOnEdit) {
        this.onEdit = isOnEdit;
        if (this.playlist) {
            this.title = this.playlist.title;
            this.description = this.playlist.description;
            this.privacyStatus = this.playlist.privacyStatus;
            // this.videoListConfig.attr.playlistId = this.playlist.id;
            // this.cdRef.markForCheck();
        }
    }

    getConfig(plId) {
        return {
            draggable: true,
            displayType: 'list',
            dragBagName: 'videolistBag',
            showShadow: true,
            attr: {
                copy: false,
                acceptDrop: true,
                playlistId: plId,
                from: 'detail'
            }
        };
    }


    onVideolistChange(event) {
        _.each(this.playlistsList, pl => {
            if (pl.id === this.playlist.id) {
                pl.videolist = event;
            }
        });
        this.dataService.setPlaylistsList(this.playlistsList);
    }

    // ------------------------------------------------------------------------
    // Track item in ngFor
    trackByFn(index: number, item: any) {
        return item.id; // index;
    }
}
