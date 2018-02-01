import { Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: 'create-playlist-dialog.component.html',
})
export class CreatePlaylistDialogComponent {

    name: string;

    constructor(
    private zone: NgZone,
    public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
        this.name = '';
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
        if (this.name !== '') {
            this.dialogRef.close({ name: this.name });
        }
    }
}
