import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';

// Root component
import { AppComponent } from './app.component';

// Mix panel

import { MixPanelComponent } from './mix-panel/mix-panel.component';
import { VideosListComponent } from './mix-panel/videos-list/videos-list.component';
import { VideosListItemComponent } from './mix-panel/videos-list-item/videos-list-item.component';
import { VideoPlayerComponent } from './mix-panel/video-player/video-player.component';
import { RangeSliderComponent } from './mix-panel/range-slider/range-slider.component';

// Shared components
import { PlaylistComponent } from './_shared/playlist/playlist.component';
import { PlaylistItemComponent } from './_shared/playlist-item/playlist-item.component';
import { SearchBarComponent } from './_shared/search-bar/search-bar.component';


// Playlist panel
import { PlaylistPanelComponent } from './playlist-panel/playlist-panel.component';
// import { CreatePlaylistDialogComponent } from './playlist-panel/create-playlist-dialog/create-playlist-dialog.component';

// Settings panel
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        // Root component
        AppComponent,

        // Shared components
        PlaylistComponent,
        PlaylistItemComponent,
        SearchBarComponent,

        // Mix panel
        MixPanelComponent,
        VideosListComponent,
        VideosListItemComponent,
        VideoPlayerComponent,
        RangeSliderComponent,
        // Playlist panel
        PlaylistPanelComponent,
        // Settings panel
        SettingsPanelComponent,
        LoginComponent
    ],
    /*
    entryComponents: [
        CreatePlaylistDialogComponent
    ],
    */
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        CoreModule,
        SharedModule
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
