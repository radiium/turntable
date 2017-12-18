import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Http service
import { HttpInterceptorService } from './services/http/http-interceptor.service';
import { HttpClientService } from './services/http/http-client.service';

// Youtube api service
import { YoutubeService,
         AuthService,
         PlaylistItemsService,
         PlaylistsService,
         VideosService,
         SearchService,
         SuggestService,
         UserInfosService } from './services/youtube';

// Others service
import { PlayerStateService } from './services/player-state.service';
import { UtilsService } from './services/utils.service';
import { OnlineService } from './services/online.service';

import { AppStateService } from './services/app-state.service';
import { DataService } from './services/data.service';

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

        // Youtube api service
        YoutubeService,
        AuthService,
        PlaylistItemsService,
        PlaylistsService,
        VideosService,
        SearchService,
        SuggestService,
        UserInfosService,

        // Others service
        PlayerStateService,
        UtilsService,
        OnlineService
    ]
})
export class CoreModule { }
