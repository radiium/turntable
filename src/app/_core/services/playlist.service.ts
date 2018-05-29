import { Injectable, Input } from '@angular/core';
import { Observable,
         Subject,
         BehaviorSubject,
         Subscription,
         timer } from 'rxjs';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { ElectronService } from 'ngx-electron';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { PlayerStateService } from 'core/services/player-state.service';

import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';
import { CreatePlaylistDialogComponent } from 'shared/dialogs/create-playlist-dialog/create-playlist-dialog.component';
import { DeletePlaylistDialogComponent } from 'shared/dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { EditPlaylistDialogComponent } from 'shared/dialogs/edit-playlist-dialog/edit-playlist-dialog.component';
import { SelectPlaylistDialogComponent } from 'shared/dialogs/select-playlist-dialog/select-playlist-dialog.component';
import { DownloadDialogComponent } from 'shared/dialogs/download-dialog/download-dialog.component';

import { PlaylistItem,
         Playlist,
         Suggests,
         PlayerPanelState,
         PlayerState,
         PlayerSide,
         AppState,
         PlaylistFactory,
         PlayListType,
         PrivacyStatus} from 'core/models';
import { app } from 'electron';


@Injectable()
export class PlaylistService {

    isElectronApp: boolean;

    appState: AppState;
    playlistsList: Playlist[];
    playerPanelState: PlayerPanelState;
    onPlayList: Playlist;
    historicList: Playlist;
    watchLaterList: Playlist;

    constructor(
    private electron: ElectronService,
    private dataSrv: DataService,
    private ytSrv: YoutubeService,
    private playerState: PlayerStateService,
    public dialog: MatDialog) {

        this.isElectronApp = this.electron.isElectronApp;

        this.dataSrv.appState$.subscribe(appState => {
            this.appState = appState;
        });

        this.dataSrv.onPlayList$.subscribe(data => {
            this.onPlayList = data;
        });

        this.dataSrv.historicList$.subscribe(data => {
            this.historicList = data;
        });

        this.dataSrv.watchLaterList$.subscribe(data => {
            this.watchLaterList = data;
        });

        this.dataSrv.playlistsList$.subscribe(datalist => {
            this.playlistsList = datalist;
        });

        this.playerState.playerPanelState$.subscribe(playerPanelState => {
            this.playerPanelState = playerPanelState;
        });
    }


    /**
     *
     * PLAYER
     *
     */
    addToPlayerListByVideolist(videoList: PlaylistItem[]) {
        if (videoList && videoList.length) {
            this.onPlayList.videolist.push.apply([...videoList]);
            this.dataSrv.setOnPlayList(this.onPlayList);
        }
    }

    addToPlayerListByType(type: PlayListType, plId: string) {

        if (type) {
            let videoList = [];
            switch (type) {
                case PlayListType.HISTORIC:
                    videoList = _.cloneDeep(this.historicList.videolist);
                    break;

                case PlayListType.WATCHLATER:
                    videoList = _.cloneDeep(this.watchLaterList.videolist);
                    break;

                case PlayListType.PLAYLIST:
                    if (plId) {
                        const playlist = this.getPlaylistById(plId);
                        videoList = _.cloneDeep(playlist.videolist);
                    }
                    break;

                case PlayListType.SEARCH:
                case PlayListType.ONPLAY:
                default:
                    break;
            }

            this.onPlayList.videolist = [...this.onPlayList.videolist, ...videoList];
            this.dataSrv.setOnPlayList(this.onPlayList);
        }
    }

    addToPlayerList(data: any) {
        const videoList = this.resolveVideoList(data);
        if (videoList && videoList.length) {
            // this.onPlayList.videolist.push.apply([...videoList]);
            this.onPlayList.videolist = [...this.onPlayList.videolist, ...videoList];
            this.dataSrv.setOnPlayList(this.onPlayList);
        }
    }

    setPlayerList(data: any) {
        const videoList = this.resolveVideoList(data);
        if (videoList && videoList.length) {
            this.dataSrv.setOnPlayList(videoList);
        }
    }

    deletePlayerList() {
        this.onPlayList.videolist = [];
        this.dataSrv.setOnPlayList(this.onPlayList);
    }


    /**
     *
     * HISTORIC
     *
     */

    addToHistoricList(video: PlaylistItem) {
        if (video) {
            this.historicList.videolist.push(video);
            this.dataSrv.setHistoricList(this.historicList);
        }
    }

    deleteHistoricList() {
        this.historicList.videolist = [];
        this.dataSrv.setHistoricList(this.historicList);
    }

    /**
     *
     *  PLAYLISTS
     *
     */

    createPlaylist(videoList?: PlaylistItem[]) {
        const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
            height: 'auto',
            panelClass: 'theme-' + this.appState.theme
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (!videoList) {
                    videoList = [];
                }

                const pl = PlaylistFactory.create(PlayListType.PLAYLIST, {
                    id: UUID.UUID(),
                    appId: UUID.UUID(),
                    title: result.name,
                    privacyStatus: PrivacyStatus.PRIVATE,
                    isLocal: true,
                    videolist: videoList
                });

                this.playlistsList.push(pl);
                this.dataSrv.setPlaylistsList(this.playlistsList);
            }
        });
    }

    showPlaylist(playlist: Playlist) {
        this.dataSrv.setSelectedPl(playlist.id);
        this.dataSrv.setSelectedTab(4);
    }

    addToPlaylistMulti(video: PlaylistItem, plId: string) {
        const plList = _.filter(this.playlistsList, (pl) => pl.id !== plId);
        if (video && plList && plList.length > 0) {
            const dialogRef = this.dialog.open(SelectPlaylistDialogComponent, {
                height: 'auto',
                data: { videoId: video.id, playlistList: plList }
            });
            dialogRef.afterClosed().subscribe(resp => {
                if (resp) {
                    _.each(resp.plIdList, (id) => {
                        const pl = this.getPlaylistById(id);
                        if (pl) {
                            pl.videolist.push(_.cloneDeep(video));
                        }
                    });
                    this.dataSrv.setPlaylistsList(this.playlistsList);
                }
            });
        }
    }

    addToPlaylistOne(data: any, plId: string) {
        const videoList = this.resolveVideoList(data);
        if (videoList && plId) {
            const plIdx = this.getPlaylistIndexById(plId);
            if (plIdx > -1) {
                this.playlistsList[plIdx].videolist = [...this.playlistsList[plIdx].videolist, ...videoList];
                this.dataSrv.setPlaylistsList(this.playlistsList);
            }
        }
    }

    editPlaylistInfos(playlist: Playlist) {
        const dialogRef = this.dialog.open(EditPlaylistDialogComponent, {
            height: 'auto',
            width: '300px',
            panelClass: 'theme-' + this.appState.theme,
            data: { playlist: playlist }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const plIdx = this.getPlaylistIndexById(playlist.id);
                if (plIdx > -1) {
                    this.playlistsList[plIdx].title         = result.title;
                    this.playlistsList[plIdx].description   = result.description;
                    this.playlistsList[plIdx].privacyStatus = result.privacyStatus;
                    this.dataSrv.setPlaylistsList(this.playlistsList);
                }
            }
        });
    }

    updatePlaylist(playlist: Playlist) {
        switch (playlist.type) {
            case PlayListType.SEARCH:
                break;

            case PlayListType.ONPLAY:
                this.dataSrv.setOnPlayList(playlist);
                break;

            case PlayListType.HISTORIC:
                this.dataSrv.setHistoricList(playlist);
                break;

            case PlayListType.WATCHLATER:
                this.dataSrv.setWatchLaterList(playlist);
                break;

            case PlayListType.PLAYLIST:
                const vlIdx = _.findIndex(this.playlistsList, { id: playlist.id });
                this.playlistsList[vlIdx] = playlist;
                this.dataSrv.setPlaylistsList(this.playlistsList);
                break;

            default:
                break;
        }

        setTimeout(() => {
            // elRef.scrollIntoView();
        });
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

                if (playlist.id === this.appState.selectedPl) {
                    this.dataSrv.setSelectedPl(null);
                    this.dataSrv.setSelectedTab(3);
                }
            }
        });
    }

    /**
     *
     *  PLAYLIST ITEM Methods
     *
     */

    playVideo(video: PlaylistItem, index: number) {
        // if (this.config.dragBagName !== 'playerListBag') {
            index = undefined;
        // }
        this.playerState.playVideo(video, index);
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

    deleteVideoOnPlaylist(video: PlaylistItem, index: number, plType: PlayListType, plId: string, withoutConfirm?: boolean) {
        if (withoutConfirm) {
            this.deleteVideo(index, plType, plId);
        } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: { title: 'Delete \'' + video.title + '\'?' }
            });
            dialogRef.afterClosed().subscribe(delVideo => {
                if (delVideo) {
                    this.deleteVideo(index, plType, plId);
                }
            });
        }
    }

    deleteVideo(index: number, type: PlayListType, plId: string) {
        if (type) {
            switch (type) {

                case PlayListType.ONPLAY:
                    this.onPlayList.videolist.splice(index, 1);
                    this.dataSrv.setOnPlayList(this.onPlayList);
                    break;

                case PlayListType.HISTORIC:
                    this.historicList.videolist.splice(index, 1);
                    this.dataSrv.setHistoricList(this.historicList);
                    break;

                case PlayListType.WATCHLATER:
                    this.watchLaterList.videolist.splice(index, 1);
                    this.dataSrv.setHistoricList(this.watchLaterList);
                    break;

                case PlayListType.PLAYLIST:
                    if (plId) {
                        const plIdx = this.getPlaylistIndexById(plId);
                        this.playlistsList[plIdx].videolist.splice(index, 1);
                        this.dataSrv.setPlaylistsList(this.playlistsList);
                    }
                    break;

                case PlayListType.SEARCH:

                default:
                    break;
            }
        }
    }

    moveVideo(from: number, to: number, type: PlayListType, plId: string, elRef?: Element) {
        let videoList;
        switch (type) {
            case PlayListType.SEARCH:
                break;

            case PlayListType.ONPLAY:
                this.onPlayList.videolist = this.move(from, to, this.onPlayList.videolist);
                this.dataSrv.setOnPlayList(this.onPlayList);
                break;

            case PlayListType.HISTORIC:
                this.historicList.videolist = this.move(from, to, this.historicList.videolist);
                this.dataSrv.setHistoricList(this.historicList);
                break;

            case PlayListType.WATCHLATER:
                this.watchLaterList.videolist = this.move(from, to, this.watchLaterList.videolist);
                this.dataSrv.setWatchLaterList(this.watchLaterList);
                break;

            case PlayListType.PLAYLIST:
                const vlIdx = _.findIndex(this.playlistsList, { id: plId });
                videoList = this.move(from, to, this.playlistsList[vlIdx].videolist);
                this.playlistsList[vlIdx].videolist = videoList;
                this.dataSrv.setPlaylistsList(this.playlistsList);
                break;

            default:
                break;
        }

        setTimeout(() => {
            // elRef.scrollIntoView();
        });
    }

    /**
     *
     * UTILS
     *
     */

    private move(from: number, to: number, videoList: PlaylistItem[]): PlaylistItem[] {
        const target = videoList[from];
        const increment = to < from ? -1 : 1;

        for (let k = from; k !== to; k += increment) {
            videoList[k] = videoList[k + increment];
        }

        videoList[to] = target;
        return videoList;
    }

    private getPlaylistById(plId: string): Playlist {
        return _.find(this.playlistsList, { id: plId});
    }

    private getPlaylistIndexById(plId: string): number {
        return _.findIndex(this.playlistsList, { id: plId });
    }

    private resolveVideoList(data: Playlist | PlaylistItem | PlaylistItem[]) {
        let videoList = [];
        if (typeof data  === 'string') {
            const pl = this.getPlaylistById(data);
            if (pl) {
                videoList = pl.videolist;
            }
            // videoList = (<Playlist>data).videolist;
        } else  if (data instanceof Playlist || (data.hasOwnProperty('type') && data['type'] === 'Playlist')) {
            videoList = (<Playlist>data).videolist;
        } else if (data instanceof PlaylistItem || (data.hasOwnProperty('type') && data['type'] === 'PlaylistItem')) {
            videoList = [data];
        } else if (Array.isArray(data)) {
            videoList = data;
        }
        return videoList;
    }
}
