import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from 'ngx-electron';

import { User } from '../models';
import { AuthService } from './youtube/auth.service';
import { DataService } from './data.service';
import { PlaylistService } from './playlist.service';

@Injectable()
export class AppStateService {


    constructor(
    private electron: ElectronService,
    private authService: AuthService,
    private dataService: DataService,
    private playlistService: PlaylistService
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
                            this.playlistService.fetchYoutubePlaylist();
                        }
                    });
                }
            });

            // Load local playlist on start up app
            this.playlistService.loadLocalPlaylist();
        }

    }

    saveAppState() {

    }

}
