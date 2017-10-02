import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Modules
import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';
import { HeaderModule } from './header/header.module';
import { EditPlaylistModule } from './_shared/modules/edit-playlist/edit-playlist.module';

// Components
// Root component
import { AppComponent } from './app.component';
// Mix panel
import { MixPanelComponent } from './mix-panel/mix-panel.component';
// Playlist panel
import { PlaylistPanelComponent } from './playlist-panel/playlist-panel.component';
// Settings panel
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        CoreModule,
        SharedModule,
        HeaderModule,
        EditPlaylistModule
    ],
    declarations: [
        // Root component
        AppComponent,
        // Mix panel
        MixPanelComponent,
        // Playlist panel
        PlaylistPanelComponent,
        // Settings panel
        SettingsPanelComponent
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
