import { Component, OnInit, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Playlist, Video } from 'core/models';
import { DataService } from 'core/services/data.service';
import { AppStateService } from 'core/services/app-state.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { DndService } from 'core/services/dnd.service';
import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EditPlaylistDialogComponent } from 'shared/dialogs/edit-playlist-dialog/edit-playlist-dialog.component';
import { DeletePlaylistDialogComponent } from 'shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { SelectPlaylistDialogComponent } from 'shared/dialogs/select-playlist-dialog/select-playlist-dialog.component';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {

    playlist: Playlist;
    playlistsList: Array<Playlist>;
    onPlayList: Array<Video>;

    onEdit: boolean;

    title: string;
    description: string;
    privacyStatus: string;

    selectedTab;

    @ViewChild('pldScrollContainer') set container(scrollContainer: ElementRef) {
        this.dndService.plDetailContainer = scrollContainer;

    }

    constructor(
    private appRef: ApplicationRef,
    private dataService: DataService,
    private appStateService: AppStateService,
    private playerState: PlayerStateService,
    private dndService: DndService,
    public dialog: MatDialog) {

        this.onEdit = false;
        this.title = '';
        this.description = '';
        this.privacyStatus = '';

        // Get selected playlist
        this.dataService.onSelectPL$.subscribe((data) => {
            this.playlist = data;
            this.updateState(false);
            this.appRef.tick();
        });

        // Get playlist list
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        // Get selected tab
        this.dataService.selectedTab$.subscribe((data) => {
            this.selectedTab = data;
        });
    }

    ngOnInit() {
    }

    editPlaylist() {
        const dialogRef = this.dialog.open(EditPlaylistDialogComponent, {
            height: 'auto',
            width: '300px',
            data: { playlist: this.playlist }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let selectedPL;
                const newPLList = _.each(this.playlistsList, (pl) => {
                    if (pl.id === this.playlist.id) {
                        pl.title = result.title;
                        pl.description = result.description;
                        pl.privacyStatus = result.privacyStatus;
                        selectedPL = pl;
                    }
                });
                this.dataService.setPlaylistsList(newPLList);
                this.dataService.setOnSelectPL(selectedPL);
                this.updateState(false);
            }
        });
    }

    deletePlaylist() {
        const dialogRef = this.dialog.open(DeletePlaylistDialogComponent, {
            data: { title: this.playlist.title }
        });
        dialogRef.afterClosed().subscribe(delPl => {
            if (delPl) {
                const newPl = _.filter(this.playlistsList, (pl) => {
                    return pl.id !== this.playlist.id;
                });
                this.dataService.setPlaylistsList(newPl);
                this.dataService.setOnSelectPL(null);
                this.dataService.setSelectedTab(3);
            }
        });
    }

    deleteVideo(video: Video, index: number) {
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
        }
    }

    playVideo(video: Video) {
        this.playerState.playVideo(video);
    }
    addToQueue(video: Video) {
        this.playerState.addToPlaylist(video);
    }

    addToPlaylist(video: Video) {
        const plList = _.filter(this.playlistsList, (pl) => {
            return pl.id !== this.playlist.id;
        });
        debugger
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

    // Set current playlist
    playPlaylist() {
        this.playerState.setPlaylist(this.playlist.videolist);
    }

    // Add to current playlist
    addToCurrentPlaylist() {
        this.playerState.addToPlaylist(this.playlist.videolist);
    }

    // ------------------------------------------------------------------------
    // Track onPlay list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id; // index;
    }
}
