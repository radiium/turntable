import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

// Services
import { ElectronService } from 'ngx-electron';
import { AuthService } from '../_core/services/auth.service';
import { PlaylistService } from '../_core/services/playlist.service';
import { OnlineService } from '../_core/services/online.service';
import { TabsService } from '../_core/services/tabs.service';

// Models
import { User } from '../_shared/models/user.model';

// Components
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    user: User;
    selectedTab: Number = 1;

    constructor(
    public dialog: MdDialog,
    private _authService: AuthService,
    private _playlistService: PlaylistService,
    private _electron: ElectronService,
    private _tabsService: TabsService) {

        // Get current selected tab
        this._tabsService.setSelectedTab(1);
        this._tabsService.selectedTab$
        .subscribe((tab) => {
            this.selectedTab = tab;
        });

        // Get user infos
        this._authService.user$
        .subscribe((user) => {
            this.user = user;
            if (user !== null) {
                this._playlistService.fetchYoutubePlaylist();
            }
        });
    }

    ngOnInit() {
    }

    changeTab(tabIndex) {
        this._tabsService.setSelectedTab(tabIndex);
    }

    signin() {
        if (this._electron.isElectronApp) {
            this._authService.login();
        }
    }

    signout() {
        if (this._electron.isElectronApp && this.user) {
            this._authService.logout();
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
