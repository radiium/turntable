import { Component, OnInit, isDevMode, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';

import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { Video, Playlist } from 'core/models';
import { UtilsService } from 'core/services/utils.service';
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
    originalOnEditPlaylist: Playlist;

    filterLocation;
    allPlaylisLocation;
    filterTitle: FormControl;

    selectedTab: number;
    displayType: any;



    constructor(
    private dataService: DataService,
    private appStateService: AppStateService,
    public utils: UtilsService,
    public dialog: MatDialog,
    private appState: AppStateService) {
    }

    ngOnInit() {

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
        this.dataService.playlistsList$.subscribe((pl: any) => {
            this.playlistsList = pl;
        });

        // Get selected playlist
        this.dataService.onSelectPL$.subscribe((pl: any) => {
            this.onSelectPL = pl;
        });
    }


    // Edit the selected playlist
    showPlaylist(playlist: Playlist) {
        this.dataService.setOnSelectPL(playlist);
        this.dataService.setSelectedTab(4);
    }

    // Play the selected playlist
    playPlaylist(playlist: Playlist) {
        // if (playlist.videolist.length > 0) {
            const pl = _.cloneDeep(playlist);
            this.dataService.setOnPlayPlayList(pl);
            this.dataService.setSelectedTab(4);
        // }
    }


    addToCurrentPlaylist(playlist: Playlist) {

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

    // Filter playlist by title
    filterPlaylists(title: string) {
        return this.playlistsList.filter(playlist =>
            playlist.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
    }
}
