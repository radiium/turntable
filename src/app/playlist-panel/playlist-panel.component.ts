import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Video } from '../_shared/models/video.model';
import { Playlist } from '../_shared/models/playlist.model';
import { PlaylistService } from '../_core/services/playlist.service';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog/create-playlist-dialog.component';
import { ConfirmDialogComponent } from '../_shared/components/confirm-dialog/confirm-dialog.component';
import { TabsService } from '../_core/services/tabs.service';
import { AuthService } from '../_core/services/auth.service';


const testPlaylist = {
    id: 'a55f086e-82e7-8e8b-f0e2-bfef59cf5cf1',
    title: 'Test playlist',
    description: '',
    thumbUrl: '',
    thumbH: null,
    thumbW: null,
    publishedAt: '',
    privacyStatus: 'public',
    isLocal: true,
    videolist: [
        {
            id: '-Cvo2fVb1aY',
            title: 'Midnight Magic - Vicious Love (Offi…',
            description: 'The official video for Vicious Lov…',
            thumbUrl: 'https://i.ytimg.com/vi/-Cvo2fVb1aY/…',
            duration: 268000
        },
        {
            id: 'MceYFMDL108',
            title: 'Midnight Magic - Drop Me A Line (Of…',
            description: 'by Pilar Wiley',
            thumbUrl: 'https://i.ytimg.com/vi/MceYFMDL108/…',
            duration: 235000
        },
        {
            id: '29uVBx9cyrs',
            title: 'Midnight Magic - I Gotta Feeling',
            description: 'Stream / Download:  https: //midnight…',
            thumbUrl: 'https://i.ytimg.com/vi/29uVBx9cyrs/…',
            duration: 346000
        },
        {
            id: '8EaYwmv7hcA',
            title: 'Midnight Magic - Beam Me Up',
            description: 'Midnight Magics official music vid…',
            thumbUrl: 'https://i.ytimg.com/vi/8EaYwmv7hcA/…',
            duration: 235000
        }
    ]
};


@Component({
  selector: 'app-playlist-panel',
  templateUrl: './playlist-panel.component.html',
  styleUrls: ['./playlist-panel.component.css']
})
export class PlaylistPanelComponent implements OnInit {

    playlistsList: Array<Playlist> = [];

    onEditPlaylist: Playlist = null;
    // searchResultPlaylist: Playlist = null;

    filterPlaylist: FormControl;
    filteredStates: Observable<any[]>;

    isEditMode: Boolean = false;

    progressBarValue: any;
    isProgressBar: Boolean;

    selectedTab: any;

    isLoggedIn: Boolean = false;

    constructor(
        public dialog: MdDialog,
        private _authService: AuthService,
        private _playlistService: PlaylistService,
        private _tabsService: TabsService) {

            this._authService.user$
            .subscribe((user: any) => {
                this.isLoggedIn = user ? true : false;
            });

            this.isProgressBar = false;

            // Get playlist list
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

            // Get selected tab
            this._tabsService.selectedTab$
            .subscribe((st: any) => {
                this.selectedTab = st;
            });

            const arr = [];
            for (let i = 0; i < 25; i++) {
                arr.push(testPlaylist);
            }
            this.playlistsList = <Playlist[]>arr;

            /*
            // Get playlist list
            this._playlistService.playListsList$
            .subscribe((pl: any) => {
                this.playlistsList = pl;
                this.updateFilterInput();
                console.log(pl);
                if (pl.length === 0) {
                    const arr = [];
                    for (let i = 0; i < 25; i++) {
                        arr.push(testPlaylist);
                    }
                    this.playlistsList = <Playlist[]>arr;
                }
            });
            */

            /*
            // Get search result playlist
            this._playlistService.searchResultPlaylist$
            .subscribe((pl: any) => {
                this.searchResultPlaylist = pl;
            });
            */

            // Init filter playlist input
            this.filterPlaylist = new FormControl();
            this.filterPlaylist.disable();
            this.filteredStates = this.filterPlaylist.valueChanges
            .startWith(null)
            .map(title => title ? this.filterPlaylists(title) : this.playlistsList.slice());
            this.updateFilterInput();
    }

    // Update disabled/enabled status of filter playlist
    updateFilterInput() {
        if (this.playlistsList.length > 1) {
            this.filterPlaylist.enable();
            this.filterPlaylist.setValue('');
        } else if (this.playlistsList.length < 2) {
            this.filterPlaylist.disable();
        }
        return false;
    }

    ngOnInit() {
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
                    id,
                    title,
                    '',
                    '',
                    null,
                    null,
                    '',
                    privacyStatus,
                    true,
                    videoList
                );

                this.playlistsList.push(pl);
                this._playlistService.setPlayListsList(this.playlistsList);
            }
        });
    }

    // Edit the selected playlist
    editPlaylist(playlist) {
        this.isEditMode = true;
        this.onEditPlaylist = playlist;
    }

    // Save the on edit playlist
    saveOnEditPlaylist() {
        const pll = this.playlistsList;
        pll.forEach((el, i) => {
            if (el.id === this.onEditPlaylist.id) { pll.splice(i, 1, this.onEditPlaylist); }
        });
        this._playlistService.setPlayListsList(pll);
        this.onEditPlaylist = null;
        // this.searchResultPlaylist = null;
        this.isEditMode = false;
    }

    // Return button
    return() {
        this.isEditMode = false;
    }

    // Play the selected playlist
    playPlaylist(playlist) {
        if (playlist.videolist.length > 0) {
            this._tabsService.setSelectedTab(2);
            this._playlistService.setOnPlayPlayList(playlist);
        }
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
}
