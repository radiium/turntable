import { NgModule } from '@angular/core';
import { HttpClientModule,
         HttpClientJsonpModule,
         HTTP_INTERCEPTORS } from '@angular/common/http';

// Http services
import { HttpInterceptorService } from 'core/services/http/http-interceptor.service';
import { HttpClientService } from 'core/services/http/http-client.service';

// App services
import { AppStateService } from 'core/services/app-state.service';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';
import { PlaylistService } from 'core/services/playlist.service';
import { PlaylistItemService } from 'core/services/playlist-item.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { TimerService } from 'core/services/timer.service';
import { OnlineService } from 'core/services/online.service';

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

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [

        // Http services
        HttpClientService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },

        // App services
        AppStateService,
        DataService,
        DndService,
        PlaylistService,
        PlaylistItemService,
        PlayerStateService,
        TimerService,
        OnlineService,

        // Youtube api services
        YoutubeService,
        AuthService,
        ChannelsApiService,
        PlaylistItemsApiService,
        PlaylistsApiService,
        VideosApiService,
        SearchApiService,
        SuggestApiService,
        UserInfosApiService,
        SubscriptionsApiService
    ]
})
export class CoreModule { }
