import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ElectronService } from 'ngx-electron';

import { TabsService } from './_core/services/tabs.service';
import { AuthService } from './_core/services/auth.service';
import { PlaylistService } from './_core/services/playlist.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    selectedTab: any;

    constructor(
    private _tabsService: TabsService,
    private Electron: ElectronService,
    private _authService: AuthService,
    private _playlistService: PlaylistService) {

        // Get selected tab
        this._tabsService.selectedTab$.subscribe((st) => {
            this.selectedTab = st;
        });

        if (this.Electron.isElectronApp) {
            // Retrieve previous user on start up and reload app
            this.Electron.ipcRenderer.send('send-get-user');
            this.Electron.ipcRenderer.on('get-user', (event, user) => {

                if (Object.keys(user).length !== 0) {

                    // Check if user is authenticated
                    this._authService.checkAuth().subscribe((resp) => {
                        if (!resp.error) {

                            // Load data from youtube
                            this._authService.setUser(user);
                            this._authService.storeToken(user.token);
                            this._playlistService.fetchYoutubePlaylist();
                        }
                    });
                }
            });

            // Load local playlist on start up app
            this._playlistService.loadLocalPlaylist();
        }

    }
}
