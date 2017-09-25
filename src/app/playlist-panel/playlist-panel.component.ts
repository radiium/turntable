import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Video } from '../_shared/models/video.model';
import { Playlist } from '../_shared/models/playlist.model';
import { PlaylistService } from '../_core/_services/playlist.service';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog/create-playlist-dialog.component';
import { ConfirmDialogComponent } from '../_shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-playlist-panel',
  templateUrl: './playlist-panel.component.html',
  styleUrls: ['./playlist-panel.component.css']
})
export class PlaylistPanelComponent implements OnInit {

    playlistsList: Array<Playlist> = [];

    onEditPlaylist: Playlist = null;
    searchResultPlaylist: Playlist = null;

    searchPlaylist: FormControl;
    filteredStates: Observable<any[]>;

    isEditMode: Boolean = false;

    constructor(
        public dialog: MdDialog,
        private _playlistService: PlaylistService) {
    }

    ngOnInit() {
        this._playlistService.playListsList$.subscribe((pl) => {
            this.playlistsList = pl;
        });
        this._playlistService.searchResultPlaylist$.subscribe((pl) => {
            this.searchResultPlaylist = pl;
        });

        this.searchPlaylist = new FormControl();
        this.filteredStates = this.searchPlaylist.valueChanges
            .startWith(null)
            .map(name => name ? this.filterPlaylists(name) : this.playlistsList.slice());
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
                    '',
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

    // Play the selected playlist
    playPlaylist(playlist) {
        this._playlistService.setOnPlayPlayList(this.onEditPlaylist);
    }

    // Delete the selected playlist
    deletePlaylist(playlist) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Delete playlist \'' + playlist.name + '\'?' }
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
        this._playlistService.updatePlaylist();
    }

}
