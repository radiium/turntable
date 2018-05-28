import { Component, Inject, ChangeDetectorRef, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElectronService } from 'ngx-electron';

import {  } from '';
import { PlaylistItem } from 'core/models';
@Component({
    selector: 'app-download-dialog',
    templateUrl: './download-dialog.component.html',
    styleUrls: ['download-dialog.component.scss']
})
export class DownloadDialogComponent implements AfterContentInit, AfterViewInit {

    isApp: boolean;
    canStartDL: boolean;
    isStarted: boolean;
    video: PlaylistItem;
    error: string;

    fileName: string;
    filePath: string;
    @ViewChild('fileNameInput') fileNameInput: ElementRef;
    @ViewChild('filePathInput') filePathInput: ElementRef;

    progressType: string;
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

        this.isStarted = false;
        this.canStartDL = false;
        this.isApp = this.electronSrv.isElectronApp;

        this.video = data.video;

        this.fileName = this.video.title || '';
        this.filePath = '';

        if (this.isApp) {
            this.electronSrv.ipcRenderer.send('send-get-save-path', { edit: false });
        }
        this.addEvent();
    }

    ngAfterContentInit() {
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        this.resizeInput(this.fileName, this.fileNameInput.nativeElement);
        this.resizeInput(this.filePath, this.filePathInput.nativeElement);
    }

    addEvent() {
        if (this.isApp) {
            this.electronSrv.ipcRenderer.on('get-save-path', this.getPathDL.bind(this));
            this.electronSrv.ipcRenderer.on('get-progress', this.getProgress.bind(this));
            this.electronSrv.ipcRenderer.on('app-error', this.handleError.bind(this));
        }
    }

    removeEvent() {
        if (this.isApp) {
            this.electronSrv.ipcRenderer.removeListener('get-save-path', this.getPathDL.bind(this));
            this.electronSrv.ipcRenderer.removeListener('get-progress', this.getProgress.bind(this));
            this.electronSrv.ipcRenderer.removeListener('app-error', this.handleError.bind(this));
        }
    }

    getPathDL(event, newPath) {
        this.filePath = newPath;
        this.resizeInput(this.filePath, this.filePathInput.nativeElement);
        this.cdr.detectChanges();
    }

    editDLPath() {
        if (this.isApp) {
            this.electronSrv.ipcRenderer.send('send-get-save-path', {
                edit: true,
                filePath: this.filePath
            });
        }
        this.cdr.detectChanges();
    }

    startDL() {
        this.canStartDL = true;
        if (this.isApp && this.video.id) {
            this.isStarted = true;
            const data = {
                videoId: this.video.id,
                fileName: this.fileName,
                filePath: this.filePath
            };
            this.electronSrv.ipcRenderer.send('send-convert-video-to-mp3', data);
        }
        this.cdr.detectChanges();
    }

    getProgress(event, data) {
        let el;
        if (data.type === 'download') {
            this.progressType = data.type;
            if (data.progress) {
                this.progress = data.progress;
            }
        }

        if (data.type === 'convert' && data.status === 'ended') {
            this.cancelDL();
        }
        this.cdr.detectChanges();
    }

    cancelDL(): void {
        this.isStarted = false;
        this.removeEvent();
        this.dialogRef.close();
        this.cdr.detectChanges();
    }

    handleError(event, error) {
        this.error = error;
        this.cdr.detectChanges();
    }

    resizeInput(event, elRef) {
        const span = document.createElement('span');
        document.body.appendChild(span);
        span.style.position = 'absolute';
        span.style.left = '-1000';
        span.style.top = '-1000';
        span.style.fontSize = '0.9rem';
        span.innerHTML = event;
        elRef.style.width = (span.clientWidth + 12 + 1) + 'px';
        span.remove();
        this.cdr.detectChanges();
    }
}
