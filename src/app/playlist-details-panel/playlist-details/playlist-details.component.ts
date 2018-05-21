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
import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EditPlaylistDialogComponent } from 'shared/dialogs/edit-playlist-dialog/edit-playlist-dialog.component';
import { DeletePlaylistDialogComponent } from 'shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { SelectPlaylistDialogComponent } from 'shared/dialogs/select-playlist-dialog/select-playlist-dialog.component';

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
            this.videoList = this.playlist.videolist;
            this.updateState(false);
            this.cdRef.markForCheck();
            // this.appRef.tick();
        });

        // Get playlist list
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
            if (this.playlist) {
                this.playlist = _.find(this.playlistsList, { id: this.playlist.id });
            }
            this.cdRef.markForCheck();
        });

        // App State
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
            this.cdRef.markForCheck();
        });
    }

    ngOnInit() {
    }

    deleteVideo(video: PlaylistItem, index: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Delete \'' + video.title + '\'?' }
        });
        dialogRef.afterClosed().subscribe(delVideo => {
            if (delVideo) {

                this.playlist.videolist.splice(index, 1);

                const plIdx = _.findIndex(this.playlistsList, { 'id': this.playlist.id });
                this.playlistsList.splice(plIdx, 1, this.playlist);
                this.dataService.setPlaylistsList(this.playlistsList);

                const isOnEdit = this.playlist.videolist.length > 0 ? true : false;
                this.updateState(isOnEdit);
            }
        });
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

    playVideo(video: PlaylistItem) {
        this.playerState.playVideo(video);
    }
    addToQueue(video: PlaylistItem) {
        this.playerState.addToPlaylist(video);
    }

    addToPlaylist(video: PlaylistItem) {
        const plList = _.filter(this.playlistsList, (pl) => {
            return pl.id !== this.playlist.id;
        });
        if (video && plList && plList.length > 0) {
            const dialogRef = this.dialog.open(SelectPlaylistDialogComponent, {
                height: 'auto',
                data: {
                    videoId: video.id,
                    playlistList: plList
                }
            });
            dialogRef.afterClosed().subscribe(resp => {
                if (resp) {
                    _.each(resp.plIdList, (plId) => {
                        const pl = _.find(this.playlistsList, { 'id': plId });
                        pl.videolist.push(_.cloneDeep(video));
                    });
                }
            });
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
