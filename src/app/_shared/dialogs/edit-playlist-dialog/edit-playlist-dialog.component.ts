import { Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Playlist } from 'core/models';
@Component({
  selector: 'app-edit-playlist-dialog',
  templateUrl: 'edit-playlist-dialog.component.html',
})
export class EditPlaylistDialogComponent {

    playlist: Playlist;
    playlistTitle: string;
    title: string;
    description: string;
    privacyStatus: string;
    privacyStatusList: any = [
        'private',
        'public'
    ];

    constructor(
    private zone: NgZone,
    public dialogRef: MatDialogRef<EditPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.playlist = data.playlist;

        this.title = data.playlist.title;
        this.description = data.playlist.description;
        this.privacyStatus = data.playlist.privacyStatus;

        this.dialogRef.keydownEvents().subscribe((key) => {
            if (key.key === 'Enter') {
                this.zone.run(() => setTimeout(() => this.onAccept() ));
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onAccept() {
        console.log();
        if (this.title !== '') {
            // this.dialogRef.close({ name: this.title });
        }
    }
}
