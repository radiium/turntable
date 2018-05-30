import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AboutDialogComponent } from 'shared/dialogs/about-dialog/about-dialog.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnChanges {

    targetId: string;
    confettis: any;
    settings: any;

    @Input() show: boolean;
    @Output() showChange = new EventEmitter<boolean>();

    constructor(public dialog: MatDialog) {
        this.targetId = 'confettis';
        this.settings = {
            target: this.targetId,
            max: 700,
            clock: 30
        };
    }

    ngOnChanges(change) {
        if (change.show) {
            if (change.show.currentValue === true) {
                this.showConfettis();
            }
        }
    }

    showConfettis() {
        this.confettis = new window['ConfettiGenerator'](this.settings);
        this.confettis.render();
        this.show = true;
        this.showChange.emit(true);

        setTimeout(() => {
            const dialogRef = this.dialog.open(AboutDialogComponent, {
                height: 'auto',
            });
            dialogRef.afterClosed().subscribe(result => {
                this.hideConfettis();
            });
        });
    }

    hideConfettis() {
        if (this.confettis) {
            this.confettis.clear();
        }
        this.confettis = null;
        this.show = false;
        this.showChange.emit(false);
    }
}
