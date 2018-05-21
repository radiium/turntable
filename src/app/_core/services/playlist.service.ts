import { Injectable, Input } from '@angular/core';
import { Observable,
         Subject,
         BehaviorSubject,
         Subscription,
         timer } from 'rxjs';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { CreatePlaylistDialogComponent } from 'shared/dialogs/create-playlist-dialog/create-playlist-dialog.component';
import { DeletePlaylistDialogComponent } from 'shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { EditPlaylistDialogComponent } from 'shared/dialogs/edit-playlist-dialog/edit-playlist-dialog.component';

import { DataService } from 'core/services/data.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { YoutubePlayerService } from 'shared/modules/youtube-player/youtube-player.service';
import { PlaylistItem,
         Playlist,
         Suggests,
         PlayerPanelState,
         PlayerState,
         PlayerSide } from 'core/models';

@Injectable()
export class PlaylistService {

    playlistsList: Playlist[];

    constructor(
    private data: DataService,
    private playerState: PlayerStateService,
    public dialog: MatDialog
    ) {
        this.data.playlistsList$.subscribe(data => {
            this.playlistsList = data;
        })
    }

    setPlayerPlaylist(playlist: Playlist) {
        this.playerState.setPlaylist(playlist.videolist);
    }
    addToPlayerPlaylist(playlist: Playlist) {
        this.playerState.addToPlaylist(playlist.videolist);
    }

    deletePlaylist(playlist: Playlist): void {
        const dialogRef = this.dialog.open(DeletePlaylistDialogComponent, {
            data: { title: playlist.title }
        });
        dialogRef.afterClosed().subscribe(delPl => {
            if (delPl) {
                _.remove(this.playlistsList, { id: playlist.id });
                this.data.setPlaylistsList(this.playlistsList);
                this.data.setOnSelectPL(null);
                this.data.setSelectedTab(3);
            }
        });
    }

    editPlaylist(playlist: Playlist) {
        const dialogRef = this.dialog.open(EditPlaylistDialogComponent, {
            height: 'auto',
            width: '300px',
            data: { playlist: playlist }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const plIdx = _.findIndex(this.playlistsList, { id: playlist.id });
                if (plIdx > -1) {
                    this.playlistsList[plIdx].title         = result.title;
                    this.playlistsList[plIdx].description   = result.description;
                    this.playlistsList[plIdx].privacyStatus = result.privacyStatus;
                    this.data.setPlaylistsList(this.playlistsList);
                }
            }
        });
    }

    showPlaylist(playlist: Playlist) {
        this.data.setOnSelectPL(playlist.id);
        this.data.setSelectedTab(4);
    }

    getPlaylist(plId: string): Playlist {
        return _.find(this.playlistsList, { id: plId})
    }
}
