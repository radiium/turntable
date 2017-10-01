import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External modules
import { DragulaModule } from 'ng2-dragula';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgxElectronModule } from 'ngx-electron';
import { CustomMaterialModule } from './modules/material/custom-material.module';

// Shared components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CreatePlaylistDialogComponent } from '../playlist-panel/create-playlist-dialog/create-playlist-dialog.component';

import { RangeSlider2Component } from './components/range-slider-2/range-slider-2.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
// pipes
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPlaylistPipe } from './pipes/filter-playlist.pipe';
// Ng2 you tube player
import { YoutubePlayerModule } from './modules/ng2-youtube-player/ng2-youtube-player';

@NgModule({
    entryComponents: [
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent
    ],
    declarations: [
        ClickOutsideDirective,
        DurationPipe,
        FilterPlaylistPipe,
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        RangeSlider2Component,
        VideoPlayerComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        NoopAnimationsModule, // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        Angular2FontawesomeModule,
        NgxElectronModule,
        YoutubePlayerModule,
        CustomMaterialModule
    ],
    exports: [
        CommonModule,
        BrowserModule,
        NoopAnimationsModule, // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        Angular2FontawesomeModule,
        NgxElectronModule,
        YoutubePlayerModule,
        ClickOutsideDirective,
        DurationPipe,
        FilterPlaylistPipe,
        RangeSlider2Component,
        VideoPlayerComponent,
        CustomMaterialModule,
    ],
    providers: [],
})
export class SharedModule { }
