import { Component, OnInit, isDevMode, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Video, Playlist } from '../../_core/models';
import { UtilsService } from '../../_core/services/utils.service';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';
import { ConfirmDialogComponent } from '../../_shared/components/confirm-dialog/confirm-dialog.component';

import * as testPlaylist from './test-playlist.json';

import { AuthService } from '../../_core/services/youtube';
import { DataService } from '../../_core/services/data.service';
import { AppStateService } from '../../_core/services/app-state.service';
import { YoutubeService } from '../../_core/services/youtube';


@Component({
  selector: 'app-library-panel',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    @ViewChild('snav') snav;


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
        this.dataService.selectedTab$.subscribe((st) => {
            this.selectedTab = st;
        });

        // Hide loading playlist progress bar
        this.isProgressBar = false;

        // Get progress bar value
        this.dataService.progressBarValue$.subscribe((pbv: any) => {
            this.progressBarValue = pbv;
            if (!pbv || pbv === 0 || pbv === 100) {
                this.isProgressBar = false;
            } else {
                this.isProgressBar = true;
            }
            if (pbv === 99) {
                this.dataService.setProgressBarValue(100);
            }
        });


        // Load a local playlist for development
        if (isDevMode()) {
            // this.insertFakeData();
        }

        // Get playlist list
        this.dataService.playListsList$.subscribe((pl: any) => {
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
                this.dataService.setPlayListsList(this.playlistsList);

                // Store local playlist in user data
                this.appState.storeLocalPlaylists();
            }
        });

    }

    // Edit the selected playlist
    editPlaylist(playlist) {
        this.isEditMode = true;
        const pl = this.utils.copyPlaylist(playlist);
        this.dataService.setOnEditPlayList(pl);
        this.originalOnEditPlaylist = this.utils.copyPlaylist(pl);
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
        this.dataService.setPlayListsList(pll);
        this.dataService.setOnEditPlayList(null);
        this.dataService.setSearchResultPlaylist(null);
    }

    // Return button (cancel modification)
    return() {
        // Check if onEditPlaylist is modified
        const isPlaylistModified = !this.utils.isVideolistEqual(
            this.onEditPlaylist.videolist,
            this.originalOnEditPlaylist.videolist);

        if (isPlaylistModified) {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: { title: 'Cancel modification?' }
            });
            dialogRef.afterClosed().subscribe(isDelete => {
                if (isDelete) {
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
            this.dataService.setSelectedTab(1);
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
                this.dataService.setPlayListsList(updatedPlaylistsList);
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


    // Load a local playlist for development
    insertFakeData() {
        /*
        const arr = [];
        for (let i = 0; i < 25; i++) {
        arr.push(testPlaylist);
        }
        this.playlistsList = <Playlist[]>arr;
        */

        const videoList = new Array<Video>();
        testPlaylist['testPlaylist']['videolist'].forEach(el => {
            const video = new Video(
                el['id'],
                el['title'],
                el['description'],
                el['thumbUrl'],
                el['duration']
            );
            videoList.push(video);
        });
        const datas = new Playlist(
            testPlaylist['testPlaylist']['id'],
            testPlaylist['testPlaylist']['title'],
            testPlaylist['testPlaylist']['description'],
            testPlaylist['testPlaylist']['thumbUrl'],
            testPlaylist['testPlaylist']['thumbH'],
            testPlaylist['testPlaylist']['thumbW'],
            testPlaylist['testPlaylist']['publishedAt'],
            testPlaylist['testPlaylist']['privacyStatus'],
            true,
            videoList
        );
        this.playlistsList = <Playlist[]>[datas];
    }
}
