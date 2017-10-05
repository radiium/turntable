import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import * as helpContent from './help-content.json';

@Component({
  selector: 'app-help-dialog',
  templateUrl: 'help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent {

    selectedTab = 1;
    tabsList;

    constructor(
    public dialogRef: MdDialogRef<HelpDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) {
        console.log(helpContent);
        this.tabsList = helpContent;
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
