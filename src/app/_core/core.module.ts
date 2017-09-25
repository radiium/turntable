import { NgModule } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';

import { AuthService } from './_services/auth.service';
import { YoutubeService } from './_services/youtube.service';
import { VideoStateService } from './_services/video-state.service';
import { PlaylistService } from './_services/playlist.service';
import { SuggestService } from './_services/suggest.service';

import { OnlineService } from './_services/online.service';
import { HttpService } from './_services/http.service';

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
