import { Component, OnInit, isDevMode, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';

import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


import * as _ from 'lodash';

import { Video, Playlist } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { CreatePlaylistDialogComponent } from 'shared/dialogs/create-playlist-dialog/create-playlist-dialog.component';
import { DeletePlaylistDialogComponent } from 'shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';

import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { AppStateService } from 'core/services/app-state.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    playlistsList: Array<Playlist> = [];
    onSelectPL: Playlist;
    onPlayList: Array<Video>;
    selectedTab: number;
    displayType: string;

    onDisplay: string;

    constructor(
    private dataService: DataService,
    private appStateService: AppStateService,
    public playerState: PlayerStateService,
    public dialog: MatDialog,
    private appState: AppStateService) {
    }

    ngOnInit() {

        this.onDisplay = 'playlistList';

        // Get current selected tab
        this.dataService.selectedTab$.subscribe((data) => {
            this.selectedTab = data;
        });

        // Get current display type
        this.displayType = 'grid';
        this.dataService.displayType$.subscribe((data) => {
            this.displayType = data;
        });

        // Get playlist list
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        // Get on play playlist
        this.dataService.onPlayList$.subscribe((data) => {
            this.onPlayList = data;
        });

        // Get selected playlist
        this.dataService.onSelectPL$.subscribe((data) => {
            this.onSelectPL = data;
        });
    }


    // Edit the selected playlist
    showPlaylist(playlist: Playlist) {
        this.dataService.setOnSelectPL(playlist);
        this.dataService.setSelectedTab(4);
    }

    // Set current playlist
    playPlaylist(playlist: Playlist) {
        this.playerState.setPlaylist(playlist.videolist);
    }

    // Add to current playlist
    addToCurrentPlaylist(playlist: Playlist) {
        this.playerState.addToPlaylist(playlist.videolist);
    }

    // Delete the selected playlist
    deletePlaylist(playlist: Playlist) {
        const dialogRef = this.dialog.open(DeletePlaylistDialogComponent, {
            data: { title: playlist.title }
        });
        dialogRef.afterClosed().subscribe(delPl => {
            if (delPl) {
                const newPl = _.filter(this.playlistsList, (pl) => {
                    return pl.id !== playlist.id;
                });
                this.dataService.setPlaylistsList(newPl);
                this.dataService.setOnSelectPL(null);
                this.dataService.setSelectedTab(3);
                // this.onStateChange();
            }
        });
    }
}
