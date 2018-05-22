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

    appState: AppState;
    playlistsList;
    selTabSetting: number;



    langagesList = [
        { value: 'en', viewValue: 'English' },
        { value: 'fr', viewValue: 'Français' }
    ];

    themesList = [
        'dark',
        'light'
    ];

    constructor(
    public dialog: MatDialog,
    private Electron: ElectronService,
    private dataSrv: DataService,
    private appStateSrv: AppStateService) {

        this.selTabSetting = 1;

        this.dataSrv.playlistsList$.subscribe((pll) => {
            this.playlistsList = pll;
        });
        this.dataSrv.appState$.subscribe((data) => {
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
                this.appStateSrv.removeLocalPlaylist();
            }
        });
    }

    onLangageChange(event) {
        this.dataSrv.setLangage(event.value);
    }

    onThemeChange(event) {
        this.dataSrv.setTheme(event.value);
    }

    onMultiPlayerChange(event) {
        this.dataSrv.setMultiPlayer(event.value);
    }
}
