import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';

import { LoginModule } from './login/login.module';
import { LibraryPanelModule } from './library-panel/library-panel.module';
import { PlayerPanelModule } from './player-panel/player-panel.module';
import { SettingsPanelModule } from './settings-panel/settings-panel.module';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,

        CoreModule,
        SharedModule,

        LoginModule,
        LibraryPanelModule,
        PlayerPanelModule,
        SettingsPanelModule,
    ],
    exports: [],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
