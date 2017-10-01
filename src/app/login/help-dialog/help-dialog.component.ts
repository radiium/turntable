import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-help-dialog',
  templateUrl: 'help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent {

    constructor(
        public dialogRef: MdDialogRef<HelpDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onPreviousTips() {

    }

    onNextTips() {

    }
}
