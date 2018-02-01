import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';

import { HomePanelModule } from './home-panel/home-panel.module';
import { SearchResultsPanelModule } from './search-results-panel/search-results-panel.module';
import { LibraryPanelModule } from './library-panel/library-panel.module';
import { PlaylistDetailsPanelModule } from './playlist-details-panel/playlist-details-panel.module';
import { PlayerPanelModule } from './player-panel/player-panel.module';
import { SettingsPanelModule } from './settings-panel/settings-panel.module';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,

        CoreModule,
        SharedModule,

        HomePanelModule,
        SearchResultsPanelModule,
        LibraryPanelModule,
        PlaylistDetailsPanelModule,
        PlayerPanelModule,
        SettingsPanelModule,
    ],
    exports: [],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
