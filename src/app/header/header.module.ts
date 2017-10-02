import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';

import { HeaderComponent } from './header.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@NgModule({
    entryComponents: [
        HelpDialogComponent
    ],
    declarations: [
        HeaderComponent,
        HelpDialogComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
