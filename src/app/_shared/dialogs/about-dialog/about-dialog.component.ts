import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

const pkg = require('../../../../../package.json');

@Component({
    selector: 'app-about-dialog',
    templateUrl: './about-dialog.component.html',
    styleUrls: ['about-dialog.component.scss']
})
export class AboutDialogComponent {

    version: string;
    author: any;
    homepage: string;

    constructor(
    private electron: ElectronService,
    public dialogRef: MatDialogRef<AboutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

        this.version = pkg.version;
        this.author = pkg.author;
        this.homepage = pkg.homepage;
    }

    openExternal(url): void {
        if (this.electron.isElectronApp) {
            this.electron.shell.openExternal(url);
        } else {
            const win = window.open(url, '_blank');
            win.focus();
        }
    }
}
