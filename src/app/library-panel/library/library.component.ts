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
import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';

import { AuthService } from 'core/services/auth.service';
import { YoutubeService } from 'core/services/youtube.service';
import { DataService } from 'core/services/data.service';
import { AppStateService } from 'core/services/app-state.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;

    playlistsList: Array<Playlist> = [];
    onEditPlaylist: Playlist;
    originalOnEditPlaylist: Playlist;

    filterLocation;
    allPlaylisLocation;
    filterTitle: FormControl;
    filteredStates: Observable<any[]>;

    progressBarValue: any;
    isProgressBar: Boolean;

    isLoggedIn: Boolean = false;
    isEditMode: Boolean = false;

    selectedTab: number;
    displayType: any;

    showSidenav = false;
    toggleIcon = 'bars';


    constructor(
    private YTService: YoutubeService,
    private dataService: DataService,
    private appStateService: AppStateService,
    public utils: UtilsService,
    public dialog: MatDialog,
    private appState: AppStateService) {
    }

    ngOnInit() {

        // Check if user is logged in
        this.dataService.user$.subscribe((user: any) => {
            this.isLoggedIn = user ? true : false;
        });

        // Get current selected tab
        this.dataService.selectedTab$.subscribe((data) => {
            this.selectedTab = data;
        });

        // Get current display type
        this.displayType = 'grid';
        this.dataService.displayType$.subscribe((data) => {
            this.displayType = data;
        });

        // Hide loading playlist progress bar
        this.isProgressBar = false;




        // Get playlist list
        this.dataService.playlistsList$.subscribe((pl: any) => {
            this.playlistsList = pl;

            // Update playlist filter
            this.initFilterLocation();
            this.updateFilterInput();
        });

        // Get on edit playlist
        this.dataService.onEditPlaylist$.subscribe((pl: any) => {
            this.onEditPlaylist = pl;
        });

        // Init playlist filter
        this.initFilterLocation();
        this.initFilterTitle();
    }

    // Init playlist filter by location
    // And disable useless filter
    initFilterLocation() {

        const plLen = this.playlistsList.length;
        let plLocal   = 0;
        let plYoutube = 0;

        this.playlistsList.forEach(playlist => {
            if (playlist.isLocal) {
                plLocal++;
            } else if (!playlist.isLocal) {
                plYoutube++;
            }
        });

        if (plLocal > 0 && plYoutube > 0) {
            this.filterLocation = 'all';
            this.allPlaylisLocation = '';
        } else if (plLocal > 0 && plYoutube === 0) {
            this.filterLocation = 'true';
            this.allPlaylisLocation = 'local';
        } else if (plLocal === 0 && plYoutube > 0) {
            this.filterLocation = 'false';
            this.allPlaylisLocation = 'youtube';
        }
    }

    // Init playlist filter by title
    initFilterTitle() {
        this.filterTitle = new FormControl();
        this.filterTitle.disable();
        this.filteredStates = this.filterTitle.valueChanges
        .startWith(null)
        .map(title => title ? this.filterPlaylists(title) : this.playlistsList.slice());
        this.updateFilterInput();
    }

    // Update disabled/enabled status of filter playlist
    updateFilterInput() {
        if (this.playlistsList.length > 1) {
            this.filterTitle.enable();
            this.filterTitle.setValue('');
        } else if (this.playlistsList.length < 2) {
            this.filterTitle.disable();
        }
        return false;
    }

    // Create new playlist
    createPlaylist() {

        const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = UUID.UUID();
                const title = result.name;
                const privacyStatus = result.privacyStatus;

                const videoList = new Array<Video>();
                const pl = new Playlist(
                    id, title, '', '', 0, 0, '',
                    privacyStatus, true,
                    videoList
                );

                this.playlistsList.push(pl);
                this.dataService.setPlaylistsList(this.playlistsList);

                // Store local playlist in user data
                this.appState.storeLocalPlaylists();
            }
        });
    }

    // Edit the selected playlist
    editPlaylist(playlist) {
        this.isEditMode = true;
        this.dataService.setOnEditPlayList(playlist);
        this.originalOnEditPlaylist = _.cloneDeep(playlist);
    }

    // Save the on edit playlist
    saveOnEditPlaylist() {
        const pl = this.utils.copyPlaylist(this.onEditPlaylist);
        const pll = this.playlistsList;
        pll.forEach((el, i) => {
            if (el.id === pl.id) {
                pll.splice(i, 1, pl);
            }
        });
        this.isEditMode = false;
        this.dataService.setPlaylistsList(pll);
        this.dataService.setOnEditPlayList(null);
        this.dataService.setSearchResultPlaylist(null);
        this.appStateService.storeLocalPlaylists();
    }

    // Return button (cancel modification)
    return() {
        const isEqual = _.isEqual(this.onEditPlaylist, this.originalOnEditPlaylist);
        if (!isEqual) {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: { title: 'Save modification?' }
            });
            dialogRef.afterClosed().subscribe(save => {
                if (save) {
                    this.saveOnEditPlaylist();
                } else {
                    this.isEditMode = false;
                    this.dataService.setOnEditPlayList(null);
                    this.dataService.setSearchResultPlaylist(null);
                }
            });
        } else {
            this.isEditMode = false;
            this.dataService.setOnEditPlayList(null);
            this.dataService.setSearchResultPlaylist(null);
        }
    }

    // Play the selected playlist
    playPlaylist(playlist) {
        // if (playlist.videolist.length > 0) {
            const pl = this.utils.copyPlaylist(playlist);
            this.dataService.setOnPlayPlayList(pl);
            this.dataService.setSelectedTab(4);
        // }
    }

    // Delete the selected playlist
    deletePlaylist(playlist) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Delete playlist \'' + playlist.title + '\'?' }
        });
        dialogRef.afterClosed().subscribe(isDelete => {
            if (isDelete && playlist) {
                const updatedPlaylistsList = this.playlistsList.filter(function(pl) {
                    return pl.id !== playlist.id;
                });
                this.appStateService.storeLocalPlaylists();
                this.dataService.setPlaylistsList(updatedPlaylistsList);
            }
        });
    }

    // Filter playlist by title
    filterPlaylists(title: string) {
        return this.playlistsList.filter(playlist =>
            playlist.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
    }

    // Reload playlist from youtube
    reloadPlaylist() {
        this.YTService.fetchYoutubePlaylist();
    }

    toggleSidenav(toggle?) {
        if (toggle) {
            this.showSidenav = toggle;
        } else {
            this.showSidenav = !this.showSidenav;
        }
        this.toggleIcon = this.showSidenav ? 'close' : 'bars';
    }

    changeDisplayType(evt) {
        this.dataService.setDisplayType(evt.value);
    }
}
