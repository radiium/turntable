import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from 'ngx-electron';

import { User, Playlist, Video } from '../models';
import { AuthService } from './youtube/auth.service';
import { DataService } from './data.service';
import { YoutubeService } from './youtube';

@Injectable()
export class AppStateService {


    playListsList;
    isElectronApp: boolean;

    constructor(
    private electron: ElectronService,
    private authService: AuthService,
    private dataService: DataService,
    private Electron: ElectronService,
    private YTService: YoutubeService
    ) {
        this.isElectronApp = this.electron.isElectronApp;


        this.playListsList = new Array<Playlist>();
        this.dataService.playListsList$
        .subscribe((pll) => {
            console.log('subscribe', pll);
            this.playListsList = pll;
        });
    }


    loadAppState() {

        if (this.isElectronApp) {
            // Retrieve previous user on start up and reload app
            this.electron.ipcRenderer.send('send-get-user');
            this.electron.ipcRenderer.on('get-user', (event, user) => {

                if (Object.keys(user).length !== 0) {

                    // Check if user is authenticated
                    this.authService.checkAuth().subscribe((resp) => {
                        if (!resp['error']) {

                            // Load data from youtube
                            this.dataService.setUser(user);
                            this.authService.storeToken(user.token);
                            this.YTService.fetchYoutubePlaylist();
                        }
                    });
                }
            });

            // Load local playlist on start up app
            this.loadLocalPlaylist();
        }

    }

    saveAppState() {

    }

        // Retrieve and store local playlist
        storeLocalPlaylists() {

            if (this.isElectronApp) {
                console.log('storeLocalPlaylists');

                this.dataService.playListsList$.subscribe((pll) => {
                    console.log('current playlistslist', pll);
                    const localPlaylists = new Array<Playlist>();
                    pll.forEach(playlist => {
                        if (playlist.isLocal) {
                            localPlaylists.push(playlist);
                        }
                    });
                    console.log('save-local-playlists', localPlaylists);
                    this.Electron.ipcRenderer.send('send-save-local-playlists', localPlaylists);
                });
            }
        }

        loadLocalPlaylist() {
            if (this.isElectronApp) {
                // Load local playlist
                this.Electron.ipcRenderer.send('send-get-local-playlists');
                this.Electron.ipcRenderer.on('get-local-playlists', (event, localPlaylist) => {
                    if (localPlaylist) {
                        localPlaylist.forEach(playlist => {
                            const pl = this.fillPlaylist(playlist);
                            this.playListsList.push(pl);
                        });
                        this.dataService.setPlayListsList(this.playListsList);
                    }
                });
            }
        }

        removeLocalPlaylist() {
            if (this.isElectronApp) {
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

        fillVideoList(videoList: Array<Video>) {
            let newVideoList;
            if (!videoList || videoList.length === 0) {
                newVideoList = new Array<Video>();
            } else {
                videoList.forEach(video => {
                    const newVideo = new Video(
                        video.id,
                        video.title,
                        video.description,
                        video.thumbUrl,
                        video.duration
                    );

                    newVideoList.push(newVideo);
                });

            }
            return newVideoList;
        }

}
