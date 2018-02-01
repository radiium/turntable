import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PUBLIC_KEY } from './public-key';
import { HttpClientService } from 'core/services/http/http-client.service';

@Injectable()
export class SearchApiService {

    private ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

    constructor(
    private _http: HttpClientService) {}

    searchVideos(query: String, pageToken?: String) {

        const maxResult = 50;
        let searchVideosUrl =
            this.ENDPOINT +
            '?q=' + query +
            '&key=' + PUBLIC_KEY +
            '&part=snippet' +
            '&maxResults=' + maxResult;
            // '&videoEmbeddable=true';

        if (pageToken) {
            searchVideosUrl += '&pageToken=' + pageToken;
        }

        return this._http.get(searchVideosUrl);
    }

}
