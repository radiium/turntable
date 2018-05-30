import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private dataSrv: DataService,
    private electronSrv: ElectronService,
    private ytSrv: YoutubeService,
    private http: HttpClient
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

        console.log('Load app data');

        const onPlayList     = PlaylistFactory.create(PlayListType.ONPLAY, <Playlist>{});
        const historicList   = PlaylistFactory.create(PlayListType.HISTORIC, <Playlist>{});
        const watchLaterList = PlaylistFactory.create(PlayListType.WATCHLATER, <Playlist>{});

        this.dataSrv.setOnPlayList(onPlayList);
        this.dataSrv.setHistoricList(historicList);
        this.dataSrv.setWatchLaterList(watchLaterList);
        this.dataSrv.setPlaylistsList([]);

        if (this.isElectronApp) {
            this.loadUser();
            this.loadAppState();
            this.loadLocalPlaylist();
            this.loadOsType();
            this.initElectronErrorHandler();

            setTimeout(() => {
                this.isFirstLoad = false;
            }, 2000);

        } else {
            this.insertFakeData();
        }

        // Listen error
        /*
        this.electronSrv.ipcRenderer.on('electron-toaster-message', (args) => {
            console.error('ERROR:', args);
        });
        */

    }

    loadUser() {
        this.electronSrv.ipcRenderer.send('getUser');
        this.electronSrv.ipcRenderer.on('getUserResp', (event, user) => {
            if (user && user.token) {
                // Check if user is authenticated
                this.checkAuth(user.token).subscribe((resp: any) => {
                    if (resp.error) {
                        this.dataSrv.setUser(null);
                    } else {
                        this.dataSrv.setUser(user);
                        this.storeToken(user.token);
                        this.ytSrv.fetchYoutubePlaylists();
                    }
                });
            }
        });
    }

    saveUser(user: User) {
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electron.ipcRenderer.send('saveUser', user);
        }
    }

    removeUser() {
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electron.ipcRenderer.send('removeUser');
        }
    }

    // Save token on localStorage
    storeToken(token) {
        if (token) {
            localStorage.setItem('id_token', token.id_token);
            localStorage.setItem('access_token', token.access_token);
            localStorage.setItem('token_type', token.token_type);
            localStorage.setItem('expires_in', token.expires_in);
            if (token.refresh_token) {
                localStorage.setItem('refresh_token', token.refresh_token);
            }
        }
    }

    // Check if user is already auth
    checkAuth(token) {
        const tokenInfoUrl = 'https://www.googleapis.com/oauth2/v1/tokeninfo';
        const URL = tokenInfoUrl + '?access_token=' + token;
        return this.http.get(URL);
    }


    /**
     *
     * Save/load App state
     *
     */

    saveAppState() {
        // console.log('===== saveAppState');
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electronSrv.ipcRenderer.send('saveAppState', JSON.stringify(this.appState));
        }
    }

    loadAppState() {
        this.electronSrv.ipcRenderer.send('getAppState');
        this.electronSrv.ipcRenderer.on('getAppStateResponse', (event, data) => {
            // console.log('===== loadAppState', data);
            if (data && Object.keys(data).length > 0) {
                data.loading = false;
                this.dataSrv.setAppState(data);
            }
        });
    }


    /**
     *
     * Save/load/remove Local playlist
     *
     */

    saveLocalPlaylists() {
        if (this.isElectronApp && !this.isFirstLoad) {
            // console.log('===== saveLocalPlaylists');
            const localPlaylists = _.filter(this.playlistsList, pl => pl.isLocal);
            this.electronSrv.ipcRenderer.send('saveLocalPL', JSON.stringify({ localPlaylists: localPlaylists }));
        }
    }

    loadLocalPlaylist() {
        this.electronSrv.ipcRenderer.send('getLocalPL');
        this.electronSrv.ipcRenderer.on('getLocalPLResp', (event, data: any) => {
            // console.log('===== loadLocalPlaylist', data);
            const lpl = data.localPlaylists;
            if (lpl && lpl.length > 0) {
                const pll = [...this.playlistsList, ..._.map(lpl, pl => this.fillPlaylist(pl))];
                this.dataSrv.setPlaylistsList(pll);
            }
        });
    }

    removeLocalPlaylist() {
        if (this.isElectronApp) {
            this.electronSrv.ipcRenderer.send('send-remove-local-playlists');
            const pll = _.filter(this.playlistsList, pl => pl.isLocal);
            this.dataSrv.setPlaylistsList(pll);
        }
    }


    /**
     *
     * Load os type
     *
     */

    loadOsType() {
        this.electronSrv.ipcRenderer.send('getOsType');
        this.electronSrv.ipcRenderer.on('getOsTypeResp', (event, osType) => {
            console.log('osType', osType);
        });
    }


    /**
     *
     * Init electron error handler
     *
     */

    initElectronErrorHandler() {
        this.electronSrv.ipcRenderer.on('onElectronError', (event, error) => {
            // console.error('ELECTRON ERROR', error);
        });
    }

    // Load a local playlist for development
    insertFakeData() {

        const query = window.location.search.slice(1);
        let num = Number(query);
        if (isNaN(num) || num === 0) {
            num = 1;
        }
        let videolist = [];
        for (let i = 0; i < num; i++) {
            videolist = [...videolist, ...this.fillVideoList(DATA['videolist'])];
        }

        const playlist = this.fillPlaylist(DATA['playlist']);
        playlist.videolist = videolist;
        this.dataSrv.setPlaylistsList([playlist]);
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
                return PlaylistItemFactory.create(video);
            });
        }
        return newVideoList;
    }
}
