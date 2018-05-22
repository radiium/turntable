import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElectronService } from 'ngx-electron';

import { User, Playlist, PlaylistItem, AppState } from '../models';
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
    private authService: AuthService,
    private dataService: DataService,
    private Electron: ElectronService,
    private YTService: YoutubeService
    ) {
        this.isElectronApp = this.electron.isElectronApp;
        this.isFirstLoad = true;

        this.playlistsList = new Array<Playlist>();
        this.dataService.playlistsList$.subscribe((pll) => {
            this.playlistsList = pll;
            this.saveAppState();
            this.storeLocalPlaylists();
        });

        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
            this.saveAppState();
        });


    }

    loadAppState() {
        if (this.isElectronApp) {
            // console.log('===== loadAppState');
            this.isFirstLoad = false;

            // Retrieve previous user on start up and reload app
            this.electron.ipcRenderer.send('send-get-user');
            this.electron.ipcRenderer.on('get-user', (event, user) => {
                if (Object.keys(user).length !== 0) {
                    // Check if user is authenticated
                    this.authService.checkAuth().subscribe((resp) => {
                        if (!resp['error']) {
                            this.dataService.setUser(user);
                            this.authService.storeToken(user.token);
                            this.YTService.fetchYoutubePlaylists();
                        }
                    });
                }
            });

            // Get app state
            this.electron.ipcRenderer.send('send-get-app-state');
            this.electron.ipcRenderer.on('get-app-state', (event, data) => {
                // console.log('get-app-state', data);
                if (data && Object.keys(data).length > 0) {
                    data.loading = false;
                    this.dataService.setAppState(data);
                }
            });

            // Load local playlist on start up app
            this.loadLocalPlaylist();
        }
    }

    saveAppState() {
        // console.log('===== saveAppState');
        if (this.isElectronApp && !this.isFirstLoad) {
            this.electron.ipcRenderer.send('send-save-app-state', this.appState);
        }
    }

    // Retrieve and store local playlist
    storeLocalPlaylists() {
        if (this.isElectronApp && !this.isFirstLoad) {
            // console.log('===== storeLocalPlaylists');
            const localPlaylists: Playlist[] = [];
            this.playlistsList.forEach(playlist => {
                if (playlist.isLocal) {
                    localPlaylists.push(playlist);
                }
            });
            this.Electron.ipcRenderer.send('send-save-local-playlists', localPlaylists);
        }
    }

    loadLocalPlaylist() {
        if (this.isElectronApp) {
            // console.log('===== loadLocalPlaylist');
            this.Electron.ipcRenderer.send('send-get-local-playlists');
            this.Electron.ipcRenderer.on('get-local-playlists', (event, localPlaylist) => {
                if (localPlaylist) {
                    localPlaylist.forEach(playlist => {
                        const pl = this.fillPlaylist(playlist);
                        this.playlistsList.push(pl);
                    });
                    this.dataService.setPlaylistsList(this.playlistsList);
                }
            });
        }
    }

    removeLocalPlaylist() {
        if (this.isElectronApp) {
            // console.log('===== removeLocalPlaylist');
            this.Electron.ipcRenderer.send('send-remove-local-playlists');
            const pll: Playlist[] = [];
            this.playlistsList.forEach(playlist => {
                if (!playlist.isLocal) {
                    pll.push(playlist);
                }
            });
            this.dataService.setPlaylistsList(pll);
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
