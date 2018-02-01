import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        PlaylistDetailsComponent
    ],
    declarations: [
        PlaylistDetailsComponent
    ]
})
export class PlaylistDetailsPanelModule { }
