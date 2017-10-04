import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class YoutubeApiService {

    private iframeScriptId = 'yt-iframe-api';
    public apiEmitter: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    // Load the Youtube iframe API
    loadApi() {
        if (window.document.getElementById(this.iframeScriptId) == null ) {
            const apiScriptTag = window.document.createElement('script');
            apiScriptTag.type = 'text/javascript';
            apiScriptTag.src = 'https://www.youtube.com/iframe_api';
            apiScriptTag.id = this.iframeScriptId;
            window.document.body.appendChild(apiScriptTag);
        }

        window['onYouTubeIframeAPIReady'] = () => {
            this.apiEmitter.emit(window['YT']);
        };
    }
}
