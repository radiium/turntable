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

@Component({
  selector: 'app-playlist-panel',
  templateUrl: './playlist-panel.component.html',
  styleUrls: ['./playlist-panel.component.css']
})
export class PlaylistPanelComponent implements OnInit {

    playlistsList: Array<Playlist> = [];

    onEditPlaylist: Playlist = null;
    searchResultPlaylist: Playlist = null;

    filterPlaylist: FormControl;
    filteredStates: Observable<any[]>;

    isEditMode: Boolean = false;

    progressBarValue: any;
    isProgressBar: Boolean;

    selectedTab: any;

    constructor(
        public dialog: MdDialog,
        private _playlistService: PlaylistService,
        private _tabsService: TabsService) {

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

            // Get playlist list
            this._playlistService.playListsList$
            .subscribe((pl: any) => {
                this.playlistsList = pl;
                this.updateFilterInput();
            });

            // Get search result playlist
            this._playlistService.searchResultPlaylist$
            .subscribe((pl: any) => {
                this.searchResultPlaylist = pl;
            });

            this.filterPlaylist = new FormControl();
            this.filterPlaylist.disable();
            this.filteredStates = this.filterPlaylist.valueChanges
            .startWith(null)
            .map(title => title ? this.filterPlaylists(title) : this.playlistsList.slice());
    }

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
        this.searchResultPlaylist = null;
        this.isEditMode = false;
    }

    return() {
        this.isEditMode = false;
    }

    // Play the selected playlist
    playPlaylist(playlist) {
        this._tabsService.setSelectedTab(1);
        this._playlistService.setOnPlayPlayList(playlist);
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

    filterPlaylists(title: string) {
        return this.playlistsList.filter(playlist =>
            playlist.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
    }

    reloadPlaylist() {
        this._playlistService.fetchYoutubePlaylist();
    }

}
