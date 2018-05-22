import { Injectable, Input } from '@angular/core';
import { Observable,
         Subject,
         BehaviorSubject,
         Subscription,
         timer } from 'rxjs';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';


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
         PlayerSide,
         AppState } from 'core/models';

@Injectable()
export class PlaylistService {

    appState: AppState;
    playlistsList: Playlist[];

    constructor(
    private dataSrv: DataService,
    private playerState: PlayerStateService,
    public dialog: MatDialog
    ) {
        this.dataSrv.appState$.subscribe(appState => {
            this.appState = appState;
        });

        this.dataSrv.playlistsList$.subscribe(datalist => {
            this.playlistsList = datalist;
        });
    }

    setPlayerPlaylist(playlist: Playlist) {
        this.dataSrv.setOnPlayList(playlist.videolist);
    }
    addToPlayerPlaylist(playlist: Playlist) {
        this.dataSrv.setOnPlayList([...this.appState.onPlayList, ...playlist.videolist]);
    }

    deletePlaylist(playlist: Playlist): void {
        const dialogRef = this.dialog.open(DeletePlaylistDialogComponent, {
            panelClass: 'theme-' + this.appState.theme,
            data: { title: playlist.title }
        });
        dialogRef.afterClosed().subscribe(delPl => {
            if (delPl) {
                _.remove(this.playlistsList, { id: playlist.id });
                this.dataSrv.setPlaylistsList(this.playlistsList);
                this.dataSrv.setSelectedPl(null);
                this.dataSrv.setSelectedTab(3);
            }
        });
    }

    editPlaylist(playlist: Playlist) {
        const dialogRef = this.dialog.open(EditPlaylistDialogComponent, {
            height: 'auto',
            width: '300px',
            panelClass: 'theme-' + this.appState.theme,
            data: { playlist: playlist }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const plIdx = _.findIndex(this.playlistsList, { id: playlist.id });
                if (plIdx > -1) {
                    this.playlistsList[plIdx].title         = result.title;
                    this.playlistsList[plIdx].description   = result.description;
                    this.playlistsList[plIdx].privacyStatus = result.privacyStatus;
                    this.dataSrv.setPlaylistsList(this.playlistsList);
                }
            }
        });
    }

    showPlaylist(playlist: Playlist) {
        this.dataSrv.setSelectedPl(playlist.id);
        this.dataSrv.setSelectedTab(4);
    }

    createPlaylist() {
        const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
            height: 'auto',
            panelClass: 'theme-' + this.appState.theme
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = UUID.UUID();
                const title = result.name;
                const privacyStatus = 'private';

                const videoList = new Array<PlaylistItem>();
                const pl = new Playlist(
                    id, title, '', '', 0, 0, '',
                    privacyStatus, true,
                    videoList
                );

                this.playlistsList.push(pl);
                this.dataSrv.setPlaylistsList(this.playlistsList);
            }
        });
    }

    getPlaylist(plId: string): Playlist {
        return _.find(this.playlistsList, { id: plId});
    }
}
