import {
    Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit,
    AfterContentInit, ElementRef, ViewChild
} from '@angular/core';
import { YoutubePlayerService } from '../services/youtube-player.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-youtube-player',
    template: `
      <div id="yt-player-ng2-component" #ytPlayerContainer></div>
    `,
})
export class YoutubePlayerComponent implements OnInit, AfterContentInit {
    @Input() videoId = '';
    @Input() height: number;
    @Input() width: number;
    /**
     * @description sets the protocol by the navigator object
     * if there is no window, it sets a default http protocol
     * unless the protocol is set from outside
     */
    @Input() protocol: string = this.getProtocol();
    @Input() playerVars: YT.PlayerVars = {};

    // player created and initialized - sends instance of the player
    @Output() ready = new EventEmitter<YT.Player>();
    // state change: send the YT event with its state
    @Output() change = new EventEmitter<YT.PlayerEvent>();

    /*@internal*/
    @ViewChild('ytPlayerContainer') public ytPlayerContainer: ElementRef;

    constructor(
        public playerService: YoutubePlayerService,
        private elementRef: ElementRef) {
    }

    ngOnInit() {
    }

    ngAfterContentInit () {
        const htmlId = this.playerService.generateUniqueId();
        const playerSize = { height: this.height, width: this.width };
        this.ytPlayerContainer.nativeElement.setAttribute('id', htmlId);
        this.playerService.loadPlayerApi({
            protocol: this.protocol
        });
        this.playerService.setupPlayer(htmlId, {
            change: this.change,
            ready: this.ready,
        }, playerSize, this.videoId, this.playerVars);
    }

    getProtocol() {
        const hasWindow = window && window.location;
        let protocol = hasWindow
          ? window.location.protocol.replace(':', '')
          : 'http';
        protocol = protocol === 'file' ? 'http' : protocol;
        return protocol;
    }
}
