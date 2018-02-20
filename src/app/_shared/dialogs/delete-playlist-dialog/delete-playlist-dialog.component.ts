import { Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { Playlist } from 'core/models';

@Component({
  selector: 'app-delete-playlist-dialog',
  templateUrl: 'delete-playlist-dialog.component.html',
  styleUrls: ['./delete-playlist-dialog.component.scss'],
})
export class DeletePlaylistDialogComponent {

    title: string;
    titleCopy: string;
    message: string;

    constructor(
    private zone: NgZone,
    public dialogRef: MatDialogRef<DeletePlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.message = '';
        this.title = data.title;

        this.dialogRef.keydownEvents().subscribe((key) => {
            if (key.key === 'Enter') {
                this.zone.run(() => setTimeout(() => this.onAccept() ));
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onAccept() {
        if (this.titleCopy !== '') {
            if (this.title === this.titleCopy) {
                this.dialogRef.close(true);
            } else {
                this.message = "Type playlist title";
            }
        }
        else {
            this.message = "Type playlist title";
        }
    }
}
