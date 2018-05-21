import { NgModule } from '@angular/core';
import { HttpClientModule,
         HttpClientJsonpModule,
         HTTP_INTERCEPTORS } from '@angular/common/http';

// Http service
import { HttpInterceptorService } from 'core/services/http/http-interceptor.service';
import { HttpClientService } from 'core/services/http/http-client.service';

// Youtube api service
import { YoutubeService } from 'core/services/youtube.service';
import { AuthService } from 'core/services/auth.service';
import { PlaylistItemsApiService,
         ChannelsApiService,
         PlaylistsApiService,
         VideosApiService,
         SearchApiService,
         SuggestApiService,
         SubscriptionsApiService,
         UserInfosApiService } from 'core/services/api';

// Others service
import { PlayerStateService } from 'core/services/player-state.service';
import { UtilsService } from 'core/services/utils.service';
import { OnlineService } from 'core/services/online.service';

import { AppStateService } from 'core/services/app-state.service';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { TimerService } from 'core/services/timer.service';
import { PlaylistService } from 'core/services/playlist.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [

        // Http service
        HttpClientService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },

        DataService,
        AppStateService,
        DndService,
        TimerService,
        // Youtube api service
        YoutubeService,
        AuthService,
        ChannelsApiService,
        PlaylistItemsApiService,
        PlaylistsApiService,
        VideosApiService,
        SearchApiService,
        SuggestApiService,
        UserInfosApiService,
        SubscriptionsApiService,

        // Others service
        PlayerStateService,
        UtilsService,
        OnlineService,
        PlaylistService
    ]
})
export class CoreModule { }
