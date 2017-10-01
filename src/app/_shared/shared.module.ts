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
import { HelpDialogComponent } from '../login/help-dialog/help-dialog.component';

import { RangeSliderComponent } from './components/range-slider/range-slider.component';
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
        CreatePlaylistDialogComponent,
        HelpDialogComponent
    ],
    declarations: [
        ClickOutsideDirective,
        DurationPipe,
        FilterPlaylistPipe,
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        HelpDialogComponent,
        RangeSliderComponent,
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
        RangeSliderComponent,
        VideoPlayerComponent,
        CustomMaterialModule,
    ],
    providers: [],
})
export class SharedModule { }
