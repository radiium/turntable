import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as _ from 'lodash';
import * as autoScroll from 'dom-autoscroller';


import { Playlist, Video, AutoScrollConfig } from 'core/models';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {

    playlistsList: Array<Playlist>;
    playlist: Playlist;
    onEdit: boolean;
    title: string;
    description: string;

    selectedTab;


    @ViewChild('pldScrollContainer') set container(scrollContainer: ElementRef) {
        const scrollConfig: AutoScrollConfig = {
            container: scrollContainer,
            selectedTab: 4,
            margin: 55,
            maxSpeed: 13
        };
        this.dndService.pldAutoScroll = scrollConfig;
    }

    constructor(
    private dataService: DataService,
    private dndService: DndService,
    public dialog: MatDialog) {

        this.onEdit = false;
        this.title = '';
        this.description = '';

        // Get selected playlist
        this.dataService.onSelectPL$.subscribe((data) => {
            this.playlist = data;
            this.onStateChange();
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

    savePlaylistInfo() {
        const selectedPL = _.each(this.playlistsList, (pl) => {
            if (pl.id === this.playlist.id) {
                pl.title = this.title;
                pl.description = this.description;
            }
        });
        this.dataService.setPlaylistsList(selectedPL);

        this.playlist.title = this.title;
        this.playlist.description = this.description;
        this.dataService.setOnSelectPL(this.playlist);
        this.onStateChange();
    }

    deletePlaylist() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Delete \'' + this.playlist.title + '\'?' }
        });
        dialogRef.afterClosed().subscribe(delPl => {
            if (delPl) {
                const newPl = _.filter(this.playlistsList, (pl) => {
                    return pl.id !== this.playlist.id;
                });
                this.dataService.setPlaylistsList(newPl);
                this.dataService.setOnSelectPL(null);
                this.dataService.setSelectedTab(3);
                this.onStateChange();
            }
        });
    }

    deleteVideo(video: Video) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Delete \'' + video.title + '\'?' }
        });
        dialogRef.afterClosed().subscribe(delVideo => {
            if (delVideo) {

                this.playlist.videolist = _.remove(this.playlist.videolist, (vid) => {
                    return vid.id !== video.id;
                });
                const plIdx = _.findIndex(this.playlistsList, { 'id': this.playlist.id });
                this.playlistsList.splice(plIdx, 1, this.playlist);
                this.dataService.setPlaylistsList(this.playlistsList);
                /*
                const newPl = _.filter(this.playlistsList, (pl) => {
                    return pl.id !== this.playlist.id;
                });
                this.dataService.setPlaylistsList(newPl);
                this.dataService.setOnSelectPL(null);
                this.dataService.setSelectedTab(3);
                this.onStateChange();
                */
            }
        });
    }

    onStateChange() {
        if (this.playlist) {
            this.title = this.playlist.title;
            this.description = this.playlist.description;
        }
        this.onEdit = false;
    }
}
