import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { UUID } from 'angular2-uuid';

import * as _ from 'lodash';

import { User, Playlist, PlaylistItem, AppState } from 'core/models';
import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';

import * as testPlaylist from '../test-playlist.json';

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

        this.playlistsList = [];
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
        } else {
            this.insertFakeData();
        }
    }

    saveAppState() {
        console.log('===== saveAppState');
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


    getOs(callback) {
        if (this.isElectronApp) {
            // console.log('===== removeLocalPlaylist');
            this.electronSrv.ipcRenderer.send('send-get-os');
            this.electronSrv.ipcRenderer.send('get-os', callback);
        } else {
            callback(null);
        }
    }

    fillPlaylist(pl: Playlist) {
        return new Playlist(
            pl.id,
            pl.title,
            pl.description,
            pl.thumbUrl,
            pl.thumbH,
            pl.thumbW,
            pl.publishedAt,
            pl.privacyStatus,
            pl.isLocal,
            this.fillVideoList(pl.videolist),
            pl.appId
        );
    }

    fillVideoList(videoList: PlaylistItem[]) {
        const newVideoList: PlaylistItem[] = [];
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
                    video.appId,
                );

                newVideoList.push(newVideo);
            });
        }
        return newVideoList;
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
        const videoList: PlaylistItem[] = [];
        testPlaylist['testPlaylist']['videolist'].forEach(el => {
            const video = new PlaylistItem(
                el['id'],
                el['selected'],
                el['title'],
                el['description'],
                el['thumbUrl'],
                el['duration'],
                el['channelTitle'],
                el['publishedAt'],
                UUID.UUID()
            );

            for (let i = 0; i < 40; i++) {
                videoList.push(video);
            }
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
            videoList,
            UUID.UUID()
        );
        // this.playlistsList = <Playlist[]>[datas];
        this.dataSrv.setPlaylistsList(<Playlist[]>[datas]);
    }
}
