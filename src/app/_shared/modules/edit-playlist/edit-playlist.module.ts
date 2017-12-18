import { NgModule } from '@angular/core';

import { SharedModule } from '../../../_shared/shared.module';

import { EditPlaylistComponent } from './edit-playlist.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
    imports: [
        // SharedModule
    ],
    declarations: [
        EditPlaylistComponent,
        PlaylistItemComponent,
        SearchBarComponent
    ], exports: [

        EditPlaylistComponent,
        /*
        PlaylistItemComponent,
        SearchBarComponent
        */
    ]
})
export class EditPlaylistModule { }
