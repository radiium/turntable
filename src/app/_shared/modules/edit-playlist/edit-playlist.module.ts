import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../_shared/shared.module';

import { EditPlaylistComponent } from './edit-playlist.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        EditPlaylistComponent,
        PlaylistComponent,
        PlaylistItemComponent,
        SearchBarComponent
    ], exports: [
        EditPlaylistComponent
    ]
})
export class EditPlaylistModule { }
