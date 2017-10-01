import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-help-dialog',
  templateUrl: 'help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent {

    selectedTab = 1;
    tabsList = [
        {index: 1, label: 'Playlist'},
        {index: 2, label: 'Mix'},
        {index: 3, label: 'Settings help'}
    ];

    constructor(
        public dialogRef: MdDialogRef<HelpDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onPreviousTab() {
        if (this.selectedTab > 1) {
            this.selectedTab--;
        }
    }

    onNextTab() {
        if (this.selectedTab < this.tabsList.length) {
            this.selectedTab++;
        }
    }

    openTab(tab) {
        this.selectedTab = tab;
    }
}
