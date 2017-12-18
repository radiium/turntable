import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Services
import { ElectronService } from 'ngx-electron';
import { PlaylistService } from '../_core/services/playlist.service';
import { OnlineService } from '../_core/services/online.service';

import { AuthService } from '../_core/services/youtube';
import { DataService } from '../_core/services/data.service';

// Models
import { User } from '../_core/models';

// Components
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user: User;

    constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private authService: AuthService,
    private _playlistService: PlaylistService,
    private _electron: ElectronService) {

        // Get user infos
        this.dataService.user$.subscribe((user) => {
            this.user = user;
            if (user !== null) {
                this._playlistService.fetchYoutubePlaylist();
            }
        });
    }

    ngOnInit() {
    }

    signin() {
        if (this._electron.isElectronApp) {
            this.authService.login();
        }
    }

    signout() {
        if (this._electron.isElectronApp && this.user) {
            this.authService.logout();
        }
    }

    openHelp() {
        const dialogRef = this.dialog.open(HelpDialogComponent, {
            width: '80%'
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
