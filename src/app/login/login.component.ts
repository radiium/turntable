import { Component, OnInit } from '@angular/core';

// Services
import { ElectronService } from 'ngx-electron';
import { AuthService } from '../_core/services/auth.service';
import { PlaylistService } from '../_core/services/playlist.service';
import { OnlineService } from '../_core/services/online.service';

// Models
import { User } from '../_shared/models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User;
    isOnline: Boolean = false;

    constructor(
        private _authService: AuthService,
        private _playlistService: PlaylistService,
        private _onlineService: OnlineService,
        private _electron: ElectronService) {

            console.log(localStorage);

            // Check internet connection
            this._onlineService.isOnline$.subscribe((isOnline) => {
                this.isOnline = isOnline;
            });

            // Get user info (and token)
            this._authService.user$
            .subscribe((user) => {
                this.user = user;
                if (user !== null) {
                    this._playlistService.fetchYoutubePlaylist();
                }
        });
    }

    ngOnInit() {}

    login() {
        if (this._electron.isElectronApp && this.isOnline) {
            this._authService.login();
        }
    }

    logout() {
        if (this._electron.isElectronApp && this.isOnline && this.user) {
            this._authService.logout();
        }
    }

    openHelp() {
        
    }
}
