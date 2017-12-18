import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VideosService } from './videos.service';
import { PUBLIC_KEY } from './public-key';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class SearchService {

    private ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

    constructor(
    private _http: HttpClientService,
    private _videosService: VideosService
    ) { }

    searchVideos(query: String) {
        const maxResult = 50;
        const searchVideosUrl =
            this.ENDPOINT +
            '?q=' + query +
            '&key=' + PUBLIC_KEY +
            '&part=snippet' +
            '&maxResults=' + maxResult;
            // '&videoEmbeddable=true';

        return this._http.get(searchVideosUrl);
    }

}
