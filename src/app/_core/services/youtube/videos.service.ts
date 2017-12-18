import { Injectable } from '@angular/core';
import { PUBLIC_KEY } from './public-key';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class VideosService {

    private ENDPOINT = 'https://www.googleapis.com/youtube/v3/videos';

    constructor(
    private _http: HttpClientService
    ) { }

    getVideosById(videosId: string) {
        const part = [
            'snippet',
            'contentDetails',
            'status',
            'player'
        ].join(',');

        const videosByIdUrl =
            this.ENDPOINT +
            '?part=' + part +
            '&id=' + videosId +
            '&key=' + PUBLIC_KEY;

        return this._http.get(videosByIdUrl);
    }
}
