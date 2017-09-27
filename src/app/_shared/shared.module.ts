import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External modules
import { DragulaModule } from 'ng2-dragula';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgxElectronModule } from 'ngx-electron';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  // MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  // MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  // MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

// Customs
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPlaylistPipe } from './pipes/filter-playlist.pipe';
import { CONSTANT } from './constant';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CreatePlaylistDialogComponent } from '../playlist-panel/create-playlist-dialog/create-playlist-dialog.component';

@NgModule({
    entryComponents: [
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent
    ],
    declarations: [
        DurationPipe,
        FilterPlaylistPipe,
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        ClickOutsideDirective
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        DragulaModule,
        YoutubePlayerModule,
        Angular2FontawesomeModule,
        NgxElectronModule,

        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        // MdCoreModule,
        MdDatepickerModule,
        MdDialogModule,
        MdExpansionModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        // MdNativeDateModule,
        MdPaginatorModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        // MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdSortModule,
        MdTableModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule
    ],
    exports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        DragulaModule,
        YoutubePlayerModule,
        Angular2FontawesomeModule,
        NgxElectronModule,

        DurationPipe,
        FilterPlaylistPipe,

        MdAutocompleteModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        // MdCoreModule,
        MdDatepickerModule,
        MdDialogModule,
        MdExpansionModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        // MdNativeDateModule,
        MdPaginatorModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        // MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdSortModule,
        MdTableModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        ClickOutsideDirective
    ],
    providers: [],
})
export class SharedModule { }
