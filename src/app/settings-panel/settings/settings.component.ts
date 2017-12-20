import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

import { ConfirmDialogComponent } from '../../_shared/components/confirm-dialog/confirm-dialog.component';
import { DataService } from '../../_core/services/data.service';
import { Playlist } from '../../_core/models';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    selectedLangage: String;
    langagesList = [
        {value: 'en', viewValue: 'English'},
        {value: 'fr', viewValue: 'Français'}
    ];

    selectedTheme: String;
    themesList = [
        'dark',
        'light'
    ];

    playListsList;

    constructor(
    private Electron: ElectronService,
    private dataService: DataService,
    public dialog: MatDialog
    ) {
        this.dataService.playListsList$
        .subscribe((pll) => {
            this.playListsList = pll;
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
                this.Electron.ipcRenderer.send('send-remove-local-playlists');
                const pll = new Array<Playlist>();
                this.playListsList.forEach(playlist => {
                    if (!playlist.isLocal) {
                        pll.push(playlist);
                    }
                });
                this.dataService.setPlayListsList(pll);
            }
        });
    }
}
