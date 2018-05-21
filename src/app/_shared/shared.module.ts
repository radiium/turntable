import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// modules
import { DragulaModule } from 'ng2-dragula';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgxElectronModule } from 'ngx-electron';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CustomMaterialModule } from './modules/material/custom-material.module';
import { YoutubePlayerModule } from './modules/youtube-player/youtube-player.module';
import { DndListModule } from './modules/dnd/dnd.module';
// import { NgxDnDModule } from '@swimlane/ngx-dnd';


import { SearchBarComponent } from './components/search-bar/search-bar.component';

// Components
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CreatePlaylistDialogComponent } from './dialogs/create-playlist-dialog/create-playlist-dialog.component';
import { DeletePlaylistDialogComponent } from './dialogs/delete-playlist-dialog/delete-playlist-dialog.component';
import { EditPlaylistDialogComponent } from './dialogs/edit-playlist-dialog/edit-playlist-dialog.component';
import { SelectPlaylistDialogComponent } from './dialogs/select-playlist-dialog/select-playlist-dialog.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { NgLoopDirective } from 'shared/directives/ng-loop.directive';

// pipes
import { DurationPipe } from './pipes/duration.pipe';
import { TotalDurationPipe } from './pipes/total-duration.pipe';
import { FilterPlaylistsPipe } from './pipes/filter-playlists.pipe';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';
import { PlayerBarComponent } from './components/player-bar/player-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { PlaylistButtonListComponent } from './components/playlist-button-list/playlist-button-list.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { PlaylistControlComponent } from './components/playlist-control/playlist-control.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    entryComponents: [
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        DeletePlaylistDialogComponent,
        EditPlaylistDialogComponent,
        SelectPlaylistDialogComponent
    ],
    declarations: [
        ClickOutsideDirective,
        TooltipDirective,
        NgLoopDirective,
        DurationPipe,
        TotalDurationPipe,
        FilterPlaylistsPipe,
        ConfirmDialogComponent,
        CreatePlaylistDialogComponent,
        DeletePlaylistDialogComponent,
        EditPlaylistDialogComponent,
        SelectPlaylistDialogComponent,

        SearchBarComponent,
        VideoListItemComponent,
        PlayerBarComponent,
        ToolbarComponent,
        VideoListComponent,
        PlaylistButtonListComponent,
        ContextMenuComponent,
        PlaylistControlComponent
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
        Angular2FontawesomeModule,
        NgxElectronModule,
        MatIconModule,
        YoutubePlayerModule,
        DndListModule,
        CustomMaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        CommonModule,
        // BrowserModule,
        NoopAnimationsModule,
        // BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        Angular2FontawesomeModule,
        NgxElectronModule,
        MatIconModule,
        YoutubePlayerModule,
        DndListModule,
        ClickOutsideDirective,
        TooltipDirective,
        NgLoopDirective,
        DurationPipe,
        TotalDurationPipe,
        FilterPlaylistsPipe,
        CustomMaterialModule,
        TranslateModule,
        SearchBarComponent,
        VideoListItemComponent,
        PlayerBarComponent,
        ToolbarComponent,
        VideoListComponent,
        PlaylistButtonListComponent,
        ContextMenuComponent,
        PlaylistControlComponent
    ],
    providers: [],
})

export class SharedModule {
    constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
    }
}
