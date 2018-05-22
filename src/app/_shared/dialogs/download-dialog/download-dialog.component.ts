import { Component, Inject, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

import {  } from '';
@Component({
    selector: 'app-download-dialog',
    templateUrl: './download-dialog.component.html',
    styleUrls: ['download-dialog.component.scss']
})
export class DownloadDialogComponent implements AfterContentInit {

    progress: any = {
        percent: 0,
        downloaded: 0,
        total: 0,
        mn: 0,
        mnRest: 0
    };

    constructor(
    private cdr: ChangeDetectorRef,
    private electronSrv: ElectronService,
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

        console.log('OPEN DownloadDialog');

        this.electronSrv.ipcRenderer.on('get-dl-progress', (event, progress) => {
            if (progress && progress === 'succes') {
                this.dialogRef.close();

            } else if (progress && progress !== 'succes') {
                console.log('progress', progress)
                this.progress = progress;
                this.cdr.detectChanges();
                document.getElementById('prBar').style.width = progress.percent + '%';
            }
        });
    }

    ngAfterContentInit() {
        this.cdr.detectChanges();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
