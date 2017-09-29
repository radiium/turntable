import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../_shared/shared.module';

import { EditPlaylistComponent } from './edit-playlist.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PlaylistHeaderComponent } from './playlist-header/playlist-header.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        EditPlaylistComponent,
        PlaylistItemComponent,
        SearchBarComponent,
        PlaylistHeaderComponent
    ], exports: [
        EditPlaylistComponent
    ]
})
export class EditPlaylistModule { }
