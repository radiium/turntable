import { Component, OnInit, isDevMode } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Video } from '../_shared/models/video.model';
import { Playlist } from '../_shared/models/playlist.model';
import { PlaylistService } from '../_core/services/playlist.service';
import { UtilsService } from '../_core/services/utils.service';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog/create-playlist-dialog.component';
import { ConfirmDialogComponent } from '../_shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../_core/services/auth.service';
import { TabsService } from '../_core/services/tabs.service';

import * as testPlaylist from './test-playlist.json';

@Component({
  selector: 'app-playlist-panel',
  templateUrl: './playlist-panel.component.html',
  styleUrls: ['./playlist-panel.component.scss']
})
export class PlaylistPanelComponent implements OnInit {

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
    public utils: UtilsService,
    public dialog: MatDialog,
    private _authService: AuthService,
    private _playlistService: PlaylistService,
    private _tabsService: TabsService) {
    }

    ngOnInit() {

        // Check if user is logged in
        this._authService.user$
        .subscribe((user: any) => {
            this.isLoggedIn = user ? true : false;
        });

        // Get current selected tab
        this._tabsService.selectedTab$
        .subscribe((st) => {
            this.selectedTab = st;
        });

        // Hide loading playlist progress bar
        this.isProgressBar = false;

        // Get progress bar value
        this._playlistService.progressBarValue$
        .subscribe((pbv: any) => {
            this.progressBarValue = pbv;
            if (!pbv || pbv === 0 || pbv === 100) {
                this.isProgressBar = false;
            } else {
                this.isProgressBar = true;
            }
            if (pbv === 99) {
                this._playlistService.setProgressBarValue(100);
            }
        });


        // Load a local playlist for development
        if (isDevMode()) {
            this.insertFakeData();
        }

        // Get playlist list
        this._playlistService.playListsList$
        .subscribe((pl: any) => {
            this.playlistsList = pl;

            // Update playlist filter
            this.initFilterLocation();
            this.updateFilterInput();
        });

        // Get on edit playlist
        this._playlistService.onEditPlaylist$
        .subscribe((pl: any) => {
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
                this._playlistService.setPlayListsList(this.playlistsList);

                // Store local playlist in user data
                this._playlistService.storeLocalPlaylists();
            }
        });

    }

    // Edit the selected playlist
    editPlaylist(playlist) {
        this.isEditMode = true;
        const pl = this.utils.copyPlaylist(playlist);
        this._playlistService.setOnEditPlayList(pl);
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
        this._playlistService.setPlayListsList(pll);
        this._playlistService.setOnEditPlayList(null);
        this._playlistService.setSearchResultPlaylist(null);
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
                    this._playlistService.setOnEditPlayList(null);
                    this._playlistService.setSearchResultPlaylist(null);
                }
            });
        } else {
            this.isEditMode = false;
            this._playlistService.setOnEditPlayList(null);
            this._playlistService.setSearchResultPlaylist(null);
        }
    }

    // Play the selected playlist
    playPlaylist(playlist) {
        // if (playlist.videolist.length > 0) {
            const pl = this.utils.copyPlaylist(playlist);
            this._playlistService.setOnPlayPlayList(pl);
            this._tabsService.setSelectedTab(2);
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
                this._playlistService.setPlayListsList(updatedPlaylistsList);
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
        this._playlistService.fetchYoutubePlaylist();
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
