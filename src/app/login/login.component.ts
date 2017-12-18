import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Services
import { ElectronService } from 'ngx-electron';
import { OnlineService } from '../_core/services/online.service';

import { AuthService } from '../_core/services/youtube';
import { DataService } from '../_core/services/data.service';
import { YoutubeService } from '../_core/services/youtube';

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
    private YTService: YoutubeService,
    public dialog: MatDialog,
    private authService: AuthService,
    private Electron: ElectronService) {

        // Get user infos
        this.dataService.user$.subscribe((user) => {
            this.user = user;
            if (user !== null) {
                this.YTService.fetchYoutubePlaylist();
            }
        });
    }

    ngOnInit() {
    }

    signin() {
        if (this.Electron.isElectronApp) {
            this.authService.login();
        }
    }

    signout() {
        if (this.Electron.isElectronApp && this.user) {
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
