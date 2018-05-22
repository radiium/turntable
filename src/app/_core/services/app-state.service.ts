import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';

import { User, Playlist, PlaylistItem, AppState } from 'core/models';
import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';

@Injectable()
export class AppStateService {

    isElectronApp: boolean;
    isFirstLoad: boolean;

    playlistsList;
    appState: AppState;

    constructor(
    private electron: ElectronService,
    private authSrv: AuthService,
    private dataSrv: DataService,
    private electronSrv: ElectronService,
    private ytSrv: YoutubeService
    ) {
        this.isElectronApp = this.electronSrv.isElectronApp;
        this.isFirstLoad = true;

        this.playlistsList = new Array<Playlist>();
        this.dataSrv.playlistsList$.subscribe((pll) => {
            this.playlistsList = pll;
            this.saveAppState();
            this.storeLocalPlaylists();
        });

        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            this.saveAppState();
        });
    }

    loadAppState() {
        if (this.isElectronApp) {
            // console.log('===== loadAppState');
            this.isFirstLoad = false;

            // Retrieve previous user on start up and reload app
            this.electronSrv.ipcRenderer.send('send-get-user');
            this.electronSrv.ipcRenderer.on('get-user', (event, user) => {
                if (user && user.token) {
                    // Check if user is authenticated
                    this.authSrv.checkAuth(user.token).subscribe((resp: any) => {
                        if (resp.error) {
                            this.dataSrv.setUser(null);
                        } else {
                            this.dataSrv.setUser(user);
                            this.authSrv.storeToken(user.token);
                            this.ytSrv.fetchYoutubePlaylists();
                        }
                    });
                } else {
                    this.dataSrv.setUser(null);
                }
            });

            // Get app state
            this.electronSrv.ipcRenderer.send('send-get-app-state');
            this.electronSrv.ipcRenderer.on('get-app-state', (event, data) => {
                // console.log('get-app-state', data);
                if (data && Object.keys(data).length > 0) {
                    data.loading = false;
                    this.dataSrv.setAppState(data);
                }
            });

            // Load local playlist on start up app
            this.loadLocalPlaylist();
        }
    }

    saveAppState() {
        // console.log('===== saveAppState');
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electronSrv.ipcRenderer.send('send-save-app-state', this.appState);
        }
    }

    // Retrieve and store local playlist
    storeLocalPlaylists() {
        if (this.isElectronApp && !this.isFirstLoad) {
            // console.log('===== storeLocalPlaylists');
            const localPlaylists = _.filter(this.playlistsList, pl => pl.isLocal);
            this.electronSrv.ipcRenderer.send('send-save-local-playlists', localPlaylists);
        }
    }

    loadLocalPlaylist() {
        if (this.isElectronApp) {
            // console.log('===== loadLocalPlaylist');
            this.electronSrv.ipcRenderer.send('send-get-local-playlists');
            this.electronSrv.ipcRenderer.on('get-local-playlists', (event, localPlaylist) => {
                if (localPlaylist && localPlaylist.length > 0) {
                    const pll = [...this.playlistsList, ..._.map(localPlaylist, pl => this.fillPlaylist(pl))];
                    this.dataSrv.setPlaylistsList(pll);
                }
            });
        }
    }

    removeLocalPlaylist() {
        if (this.isElectronApp) {
            // console.log('===== removeLocalPlaylist');
            this.electronSrv.ipcRenderer.send('send-remove-local-playlists');
            const pll = _.filter(this.playlistsList, pl => pl.isLocal);
            this.dataSrv.setPlaylistsList(pll);
        }
    }


    fillPlaylist(pl: Playlist) {
        const playlist = new Playlist(
            pl.id,
            pl.title,
            pl.description,
            pl.thumbUrl,
            pl.thumbH,
            pl.thumbW,
            pl.publishedAt,
            pl.privacyStatus,
            pl.isLocal,
            this.fillVideoList(pl.videolist)
        );
        return playlist;
    }

    fillVideoList(videoList: Array<PlaylistItem>) {
        const newVideoList = new Array<PlaylistItem>();
        if (videoList || videoList.length > 0) {
            videoList.forEach(video => {
                const newVideo = new PlaylistItem(
                    video.id,
                    video.selected,
                    video.title,
                    video.description,
                    video.thumbUrl,
                    video.duration,
                    video.channelTitle,
                    video.publishedAt,
                );

                newVideoList.push(newVideo);
            });
        }
        return newVideoList;
    }
}
