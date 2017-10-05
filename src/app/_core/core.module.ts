import { NgModule } from '@angular/core';

import { AuthService } from './services/auth.service';
import { YoutubeDataService } from './services/youtube-data.service';
import { PlayerStateService } from './services/player-state.service';
import { PlaylistService } from './services/playlist.service';
import { SuggestService } from './services/suggest.service';
import { TabsService } from './services/tabs.service';
import { UtilsService } from './services/utils.service';
import { OnlineService } from './services/online.service';
import { HttpService } from './services/http.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        YoutubeDataService,
        PlayerStateService,
        PlaylistService,
        SuggestService,
        TabsService,
        UtilsService,
        OnlineService,
        HttpService
    ]
})
export class CoreModule { }
