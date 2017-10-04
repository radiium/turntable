import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy,
    OnInit, ElementRef, ViewChild} from '@angular/core';

import { YoutubePlayerService } from './youtube-player.service';
import { YoutubeApiService } from './youtube-api.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-youtube-player',
    template: `
        <div id="yt-player-ng2-component" #playercontainer></div>
    `,
})
export class YoutubePlayerComponent implements OnInit {

    // Player configuration
    @Input() videoId: string;
    @Input() height: number;
    @Input() width: number;

    // Player events
    @Output() ready = new EventEmitter<YT.Player>();
    @Output() change = new EventEmitter();

    // Player container
    @ViewChild('playercontainer') private playercontainer: ElementRef;

    constructor(
    public youtubeApiService: YoutubeApiService,
    public youtubePlayer: YoutubePlayerService) {
        this.videoId = '';
    }

    ngOnInit () {

        // Add unique id of player container
        const playerId = this.generateUniqueId();
        this.playercontainer.nativeElement.setAttribute('id', playerId);

        // Define player configuration
        const playerConfig = {
            playerId: playerId,
            width: this.width,
            height: this.height,
            videoId: this.videoId,
            outputs: {
                ready: this.ready,
                change: this.change
            }
        };

        // Load the Youtube API (iframe_api)
        this.youtubeApiService.loadApi();

        // Create and load the youtube player
        this.youtubePlayer.load(playerConfig);
    }

    // Generate random string
    generateUniqueId () {
        const len = 7;
        return Math.random().toString(35).substr(2, len);
    }
}
