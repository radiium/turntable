import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// modules
import { DragulaModule } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgxElectronModule } from 'ngx-electron';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CustomMaterialModule } from './modules/material/custom-material.module';
import { YoutubePlayerModule } from './modules/youtube-player/youtube-player.module';

// import { EditPlaylistModule } from './modules/edit-playlist/edit-playlist.module';

import { EditPlaylistComponent } from './modules/edit-playlist/edit-playlist.component';
import { PlaylistItemComponent } from './modules/edit-playlist/playlist-item/playlist-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

// Components
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CreatePlaylistDialogComponent } from './dialogs/create-playlist-dialog/create-playlist-dialog.component';
import { SelectPlaylistDialogComponent } from './dialogs/select-playlist-dialog/select-playlist-dialog.component';

import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';

// pipes
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPlaylistsPipe } from './pipes/filter-playlists.pipe';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';


@NgModule({
    entryComponents: [
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        SelectPlaylistDialogComponent,
    ],
    declarations: [
        ClickOutsideDirective,
        DurationPipe,
        FilterPlaylistsPipe,
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        SelectPlaylistDialogComponent,
        RangeSliderComponent,
        VideoPlayerComponent,

        EditPlaylistComponent,
        PlaylistItemComponent,
        SearchBarComponent,
        VideoListItemComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        NoopAnimationsModule,
        // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        DndModule.forRoot(),
        Angular2FontawesomeModule,
        NgxElectronModule,
        InfiniteScrollModule,
        YoutubePlayerModule,
        // EditPlaylistModule,
        CustomMaterialModule
    ],
    exports: [
        CommonModule,
        // BrowserModule,
        NoopAnimationsModule,
        // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        DndModule,
        Angular2FontawesomeModule,
        NgxElectronModule,
        InfiniteScrollModule,
        YoutubePlayerModule,
        ClickOutsideDirective,
        DurationPipe,
        FilterPlaylistsPipe,
        RangeSliderComponent,
        VideoPlayerComponent,
        CustomMaterialModule,
        // EditPlaylistModule,
        EditPlaylistComponent,
        PlaylistItemComponent,
        SearchBarComponent,
        VideoListItemComponent,
    ],
    providers: [],
})
export class SharedModule { }
