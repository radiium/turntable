import { Injectable } from '@angular/core';
import { PUBLIC_KEY } from './public-key';
import { HttpClientService } from 'core/services/http/http-client.service';

@Injectable()
export class SuggestApiService {

    private ENDPOINT = 'http://suggestqueries.google.com/complete/search';

    constructor(
    private _http: HttpClientService
    ) { }

    searchSuggestsVideo(query: String) {
        const searchSuggestsUrl =
            this.ENDPOINT +
            '?q=' + query +
            '&client=youtube' +
            '&hl=fr' +
            '&ds=yt';
            // '&callback=' + CB;

        return this._http.jsonp(searchSuggestsUrl, 'callback');
    }
}
