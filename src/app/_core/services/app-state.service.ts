import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { UUID } from 'angular2-uuid';

import * as _ from 'lodash';

import { User,
         Playlist,
         PlaylistItem,
         AppState,
         PlaylistFactory,
         PlayListType,
         PrivacyStatus, 
         Thumbnail,
         PlaylistItemFactory} from 'core/models';
import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';

import * as DATA from '../test-playlist.json';

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
        this.dataSrv.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
            // this.saveAppState();
            this.saveLocalPlaylists();
        });

        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            this.saveAppState();
        });
    }

    initAppData() {

        this.isFirstLoad = false;

        const onPlayList     = PlaylistFactory.create(PlayListType.ONPLAY, <Playlist>{});
        const historicList   = PlaylistFactory.create(PlayListType.HISTORIC, <Playlist>{});
        const watchLaterList = PlaylistFactory.create(PlayListType.WATCHLATER, <Playlist>{});

        this.dataSrv.setOnPlayList(onPlayList);
        this.dataSrv.setHistoricList(historicList);
        this.dataSrv.setWatchLaterList(watchLaterList);
        this.dataSrv.setPlaylistsList([]);

        if (this.isElectronApp) {
            this.loadUser();
            this.loadAppState2();
            this.loadLocalPlaylist2();
        } else {
            this.insertFakeData();
        }

    }

    loadUser() {
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
            }
        });
    }


    /**
     * 
     * Save/load App state
     * 
     */

    saveAppState() {
        console.log('===== saveAppState');
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electronSrv.ipcRenderer.send('send-save-app-state', this.appState);
        }
    }

    loadAppState2() {
        this.electronSrv.ipcRenderer.send('send-get-app-state');
        this.electronSrv.ipcRenderer.on('get-app-state', (event, data) => {
            if (data && Object.keys(data).length > 0) {
                data.loading = false;
                this.dataSrv.setAppState(data);
            }
        });
    }


    /**
     * 
     * Save/load Local playlist
     * 
     */

    saveLocalPlaylists() {
        if (this.isElectronApp && !this.isFirstLoad) {
            const localPlaylists = _.filter(this.playlistsList, pl => pl.isLocal);
            this.electronSrv.ipcRenderer.send('send-save-local-playlists', localPlaylists);
        }
    }

    loadLocalPlaylist2() {
        this.electronSrv.ipcRenderer.send('send-get-local-playlists');
        this.electronSrv.ipcRenderer.on('get-local-playlists', (event, localPlaylist) => {
            if (localPlaylist && localPlaylist.length > 0) {
                const pll = [...this.playlistsList, ..._.map(localPlaylist, pl => this.fillPlaylist(pl))];
                this.dataSrv.setPlaylistsList(pll);
            }
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

        const thumb: Thumbnail = {
            url: pl.thumb.url,
            height: pl.thumb.height,
            width: pl.thumb.width,
        };

        const playlists = PlaylistFactory.create(PlayListType.PLAYLIST, {
            id: pl.id,
            appId: pl.appId || UUID.UUID(),
            title: pl.title,
            description: pl.description,
            thumb: thumb,
            publishedAt: pl.publishedAt,
            privacyStatus: pl.privacyStatus,
            isLocal: pl.isLocal,
            videolist: this.fillVideoList(pl.videolist),
            
        });

        return playlists;
    }

    fillVideoList(videoList: PlaylistItem[]) {
        let newVideoList: PlaylistItem[] = [];
        if (videoList || videoList.length > 0) {
            newVideoList = _.map(videoList, (video) => {
                return PlaylistItemFactory.create(video) 
            });
        }
        return newVideoList;
    }

     // Load a local playlist for development
     insertFakeData() {

        var query = window.location.search.slice(1);
        

        let num = Number(query);
        if (isNaN(num) || num === 0) num = 1;
        let videolist = [];
        for (let i = 0; i < num; i++) {
            videolist = [...videolist, ...this.fillVideoList(DATA['videolist'])];
        }

        const playlist = this.fillPlaylist(DATA['playlist']);
        playlist.videolist = videolist;
        this.dataSrv.setPlaylistsList([playlist]);
    }
}
