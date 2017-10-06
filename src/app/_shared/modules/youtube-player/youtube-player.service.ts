import { NgZone, Injectable } from '@angular/core';

import { YoutubeApiService } from './youtube-api.service';
import { IPlayerConfig } from './models';

@Injectable()
export class YoutubePlayerService {

    private defaultWidth:  Number = 300;
    private defaultHeight: Number = 200;

    constructor(
    private zone: NgZone,
    private youtubeApi: YoutubeApiService ) {
    }

    // Create and load player when Youtube api (iframe_api) is loaded
    load(playerConfig: IPlayerConfig) {
        this.youtubeApi.apiEmitter.subscribe((data) => {
            this.zone.run(() => this.newPlayer(playerConfig));
        });
    }

    // Create a player at DOM id
    private newPlayer(playerConfig: IPlayerConfig) {

        // Player options
        const options = {
            enablejsapi: 1,
            origin: 'https://www.youtube.com',
            rel: 0
        };

        const player = new window['YT'].Player(playerConfig.playerId, {
            width: playerConfig.width || this.defaultWidth,
            height: playerConfig.height || this.defaultHeight,
            videoId: playerConfig.videoId,
            options,
            events: {

                // Send player when is ready
                onReady: (event: YT.PlayerEvent) => {
                    playerConfig.outputs.ready.emit(event.target);
                },

                // Send player state on change
                onStateChange: (event: YT.OnStateChangeEvent) => {
                    playerConfig.outputs.change.emit(event);
                }
            }
        });
    }
}
