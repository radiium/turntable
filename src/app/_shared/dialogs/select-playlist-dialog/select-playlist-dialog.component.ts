import { Component, Inject, ViewChild, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { Playlist } from 'core/models';

@Component({
    selector: 'app-select-playlist-dialog',
    templateUrl: './select-playlist-dialog.component.html',
    styleUrls: ['select-playlist-dialog.component.scss']
})
export class SelectPlaylistDialogComponent {

    @ViewChild('list') list: any;
    videoId: string;
    playlistList: Playlist[];

    constructor(
    private zone: NgZone,
    public dialogRef: MatDialogRef<SelectPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.videoId = data.videoId;
        this.playlistList = data.playlistList;

        this.dialogRef.keydownEvents().subscribe((key) => {
            if (key.key === 'Enter') {
                this.zone.run(() => setTimeout(() => this.onAccept() ));
            }
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onAccept() {
        const selectedPl = this.list.selectedOptions.selected;
        const plIdList = _.map(selectedPl, (item: any) => {
            return item._element.nativeElement.dataset.plId;
        });
        this.dialogRef.close({ plIdList: plIdList });
    }

    isSelected(plId: string) {
        let video = null;
        const currPl = _.find(this.playlistList, { 'id': plId });
        if (currPl) {
            video = _.find(currPl.videolist, { 'id': this.videoId });
        }
        return video;
    }

}
