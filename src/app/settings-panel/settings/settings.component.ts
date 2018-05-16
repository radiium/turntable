import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

import { ConfirmDialogComponent } from 'shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DataService } from 'core/services/data.service';
import { AppStateService } from 'core/services/app-state.service';
import { Playlist, AppState } from 'core/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    selTabSetting: any = 1;

    playlistsList;

    appState: AppState;

    langagesList = [
        { value: 'en', viewValue: 'English' },
        { value: 'fr', viewValue: 'Français' }
    ];

    themesList = [
        'dark',
        'light'
    ];


    constructor(
    private Electron: ElectronService,
    private dataService: DataService,
    private appStateService: AppStateService,
    public dialog: MatDialog
    ) {
        this.dataService.playlistsList$.subscribe((pll) => {
            this.playlistsList = pll;
        });

        // App State
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
        });
    }

    ngOnInit() {
    }

    removeLocalPlaylist() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { title: 'Remove local playlists?' }
        });
        dialogRef.afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.appStateService.removeLocalPlaylist();
            }
        });
    }

    onLangageChange(event) {
        this.dataService.setLangage(event);
    }

    onThemeChange(event) {
        this.dataService.setTheme(event.value);
    }

    onMultiPlayerChange(event) {
        this.dataService.setMultiPlayer(event.value);
    }
}
