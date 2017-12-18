import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { LoginComponent } from './login.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@NgModule({
    entryComponents: [
        HelpDialogComponent
    ],
    declarations: [
        LoginComponent,
        HelpDialogComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
