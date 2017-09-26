import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { YoutubeService } from './services/youtube.service';
import { VideoStateService } from './services/video-state.service';
import { PlaylistService } from './services/playlist.service';
import { SuggestService } from './services/suggest.service';

import { OnlineService } from './services/online.service';
import { HttpService } from './services/http.service';

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AuthService,
        YoutubeService,
        VideoStateService,
        PlaylistService,
        SuggestService,
        OnlineService,
        HttpService
    ]
})
export class CoreModule { }
