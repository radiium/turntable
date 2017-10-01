import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { YoutubeService } from './services/youtube.service';
import { PlayerService } from './services/player.service';
import { PlaylistService } from './services/playlist.service';
import { SuggestService } from './services/suggest.service';
import { TabsService } from './services/tabs.service';
import { UtilsService } from './services/utils.service';

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
        PlayerService,
        PlaylistService,
        SuggestService,
        TabsService,
        UtilsService,
        OnlineService,
        HttpService
    ]
})
export class CoreModule { }
