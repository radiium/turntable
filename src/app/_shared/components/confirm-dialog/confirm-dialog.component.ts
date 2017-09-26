import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

    title: string;

    constructor(
        public dialogRef: MdDialogRef<ConfirmDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
            this.title = data.title;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
