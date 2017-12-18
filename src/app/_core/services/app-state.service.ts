import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from 'ngx-electron';

import { User, Playlist } from '../models';
import { AuthService } from './youtube/auth.service';
import { DataService } from './data.service';
import { YoutubeService } from './youtube';

@Injectable()
export class AppStateService {


    constructor(
    private electron: ElectronService,
    private authService: AuthService,
    private dataService: DataService,
    private Electron: ElectronService,
    private YTService: YoutubeService
    ) {

    }


    loadAppState() {

        if (this.electron.isElectronApp) {
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
            console.log('storeLocalPlaylists');
            this.dataService.playListsList$.subscribe((pll) => {
                console.log('current playlistslist', pll);
                const localPlaylists = new Array<Playlist>();
                pll.forEach(playlist => {
                    if (playlist.isLocal) {
                        localPlaylists.push(playlist);
                    }
                });
                this.Electron.ipcRenderer.send('save-local-playlists', localPlaylists);
            });
        }

        loadLocalPlaylist() {
            // Load local playlist
            this.Electron.ipcRenderer.send('send-get-local-playlists');
            this.Electron.ipcRenderer.on('get-local-playlists', (event, localPlaylist) => {

                if (localPlaylist) {
                    const newPlaylistsList = new Array<Playlist>();
                    this.dataService.playListsList$.subscribe((pll) => {
                        pll.forEach(playlist => {
                            newPlaylistsList.push(playlist);
                        });

                        localPlaylist.forEach(playlist => {
                            newPlaylistsList.push(playlist);
                        });


                        this.dataService.setPlayListsList(newPlaylistsList);
                    });
                }
            });
        }

}
