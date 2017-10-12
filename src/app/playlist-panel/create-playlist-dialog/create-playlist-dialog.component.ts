import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: 'create-playlist-dialog.component.html',
})
export class CreatePlaylistDialogComponent {

    name: string;
    privacyStatus: string;

    constructor(
    public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.name = '';
        this.privacyStatus = 'public';
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onAccept() {
        if (this.name !== '' && this.privacyStatus !== '') {
            this.dialogRef.close({
                name: this.name,
                privacyStatus: this.privacyStatus
            });
        }
    }
}
