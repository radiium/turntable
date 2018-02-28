import { Component, OnInit, isDevMode, ViewChild, HostListener } from '@angular/core';
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
    playerList: Array<Video>;

    originalOnEditPlaylist: Playlist;

    filterLocation;
    allPlaylisLocation;
    filterTitle: FormControl;

    selectedTab: number;
    displayType: any;

    colCount = 3;

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
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        // Get on play playlist
        this.dataService.playerList$.subscribe((data) => {
            this.playerList = data;
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

    // Play the selected playlist
    playPlaylist(playlist: Playlist) {
        console.log('playPlaylist');
        const pl = _.cloneDeep(playlist.videolist);
        this.dataService.setPlayerList(pl);
        this.dataService.setSelectedTab(5);
    }

    addToCurrentPlaylist(playlist: Playlist) {
        if (this.playerList) {
            const newPlayerList = this.playerList.concat(playlist.videolist);
            this.dataService.setPlayerList(newPlayerList);
        }
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


    @HostListener('window:resize', ['$event'])
    onResize(event) {

        const contWidth = event.target.innerWidth - 250 - 40;

        if (contWidth >= 1000) {
            this.colCount = 5;
        } else if (contWidth < 1000 && contWidth >= 800) {
            this.colCount = 4;
        } else if (contWidth < 800 && contWidth >= 600) {
            this.colCount = 3;
        } else if (contWidth < 600 && contWidth >= 450) {
            this.colCount = 2;
        } else {
            this.colCount = 1;
        }

        // console.log('colCount', this.colCount)
    }
}
