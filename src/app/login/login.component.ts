import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

// Services
import { AuthService } from '../_core/_services/auth.service';
import { YoutubeService } from '../_core/_services/youtube.service';
import { PlaylistService } from '../_core/_services/playlist.service';
import { OnlineService } from '../_core/_services/online.service';

// Models
import { User } from '../_shared/models/user.model';

declare const electronOauth2: any;

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
        private _youtubeService: YoutubeService,
        private _playlistService: PlaylistService,
        private _onlineService: OnlineService) {

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
                    this._playlistService.updatePlaylist();
                }
        });
    }


    ngOnInit() {
    }

    login() {
        this._authService.login();
    }

    logout() {
        this._authService.logout();
    }
}
