import { Injectable, Input } from '@angular/core';
import { Observable,
         Subject,
         BehaviorSubject,
         Subscription,
         timer } from 'rxjs';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';
import { SelectPlaylistDialogComponent } from 'shared/dialogs/select-playlist-dialog/select-playlist-dialog.component';

import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { YoutubePlayerService } from 'shared/modules/youtube-player/youtube-player.service';
import { PlaylistItem,
         Playlist,
         Suggests,
         PlayerPanelState,
         PlayerState,
         PlayerSide,
         AppState } from 'core/models';
import { ElectronService } from 'ngx-electron';
import { DownloadDialogComponent } from 'shared/dialogs/download-dialog/download-dialog.component';

@Injectable()
export class PlaylistItemService {

    appState: AppState;
    playlistsList: Playlist[];
    playerPanelState: PlayerPanelState;
    isElectronApp: boolean;

    constructor(
    private electron: ElectronService,
    private dataSrv: DataService,
    private ytSrv: YoutubeService,
    private playerState: PlayerStateService,
    public dialog: MatDialog
    ) {

        this.isElectronApp = this.electron.isElectronApp;

        this.dataSrv.appState$.subscribe(appState => {
            this.appState = appState;
        });

        this.dataSrv.playlistsList$.subscribe(datalist => {
            this.playlistsList = datalist;
        });

        this.playerState.playerPanelState$.subscribe(playerPanelState => {
            this.playerPanelState = playerPanelState;
        });
    }

    playVideo(video: PlaylistItem, index: number) {
        // if (this.config.dragBagName !== 'playerListBag') {
            index = undefined;
        // }
        this.playerState.playVideo(video, index);
    }

    addToPlayerList(video: PlaylistItem) {
        this.dataSrv.setOnPlayList([...this.appState.onPlayList, video]);
    }

    addToPlaylist(video: PlaylistItem, plId: string) {
        const plList = _.filter(this.playlistsList, (pl) => pl.id !== plId);
        if (video && plList && plList.length > 0) {
            const dialogRef = this.dialog.open(SelectPlaylistDialogComponent, {
                height: 'auto',
                data: { videoId: video.id, playlistList: plList }
            });
            dialogRef.afterClosed().subscribe(resp => {
                if (resp) {
                    _.each(resp.plIdList, (id) => {
                        const pl = _.find(this.playlistsList, { id: id });
                        pl.videolist.push(_.cloneDeep(video));
                    });
                }
            });
        }
    }

    // Download and convert video as mp3
    download(video: PlaylistItem) {
        const dialogRef = this.dialog.open(DownloadDialogComponent, {
            height: 'auto',
            width: '500px',
            disableClose: true,
            data: { video: video }
        });
        dialogRef.afterClosed().subscribe(resp => {
            console.log('CLOSE DownloadDialog');
        });
    }

    deleteVideo(video: PlaylistItem, index: number, plId: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Delete \'' + video.title + '\'?' }
        });
        dialogRef.afterClosed().subscribe(delVideo => {
            if (delVideo) {

                switch (plId) {
                    case 'search':
                        break;

                    case 'onplay':
                        this.appState.onPlayList.splice(index, 1);
                        this.dataSrv.setOnPlayList(this.appState.onPlayList);
                        break;

                    case 'historic':
                        this.appState.historicList.splice(index, 1);
                        this.dataSrv.setHistoricList(this.appState.historicList);
                        break;

                    default:
                        const plIdx = _.findIndex(this.playlistsList, { 'id': plId });
                        this.playlistsList[plIdx].videolist.splice(index, 1);
                        this.dataSrv.setPlaylistsList(this.playlistsList);
                        break;
                }
            }
        });
    }

    moveVideo(from: number, to: number, plId: string, elRef: Element) {

        let videoList;
        switch (plId) {
            case 'search':
                break;

            case 'onplay':
                videoList = this.move(from, to, this.appState.onPlayList);
                this.dataSrv.setOnPlayList(videoList);
                break;

            case 'historic':
                videoList = this.move(from, to, this.appState.historicList);
                this.dataSrv.setHistoricList(videoList);
                break;

            default:
                const vlIdx = _.findIndex(this.playlistsList, { id: plId });
                videoList = this.move(from, to, this.playlistsList[vlIdx].videolist);
                this.playlistsList[vlIdx].videolist = videoList;
                this.dataSrv.setPlaylistsList(this.playlistsList);
                break;
        }

        setTimeout(() => elRef.scrollIntoView() );
    }

    private move(from: number, to: number, videoList: PlaylistItem[]): PlaylistItem[] {
        const target = videoList[from];
        const increment = to < from ? -1 : 1;

        for (let k = from; k !== to; k += increment) {
            videoList[k] = videoList[k + increment];
        }

        videoList[to] = target;
        return videoList;
    }
}
