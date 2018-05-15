

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientService } from 'core/services/http/http-client.service';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from './public-key';

@Injectable()
export class PlaylistsApiService {

    private ENDPOINT = 'https://www.googleapis.com/youtube/v3/channels';
    private maxResult = 50;

    constructor(
         // private _http:  HttpClient
        private _http:  HttpClientService
    ) { }

    // ------------------------------------------------------------------------
    // Get all playlist of user
    getMyChannelId(userName): Observable<any> {
        const queryUrl =
            this.ENDPOINT +
            '?key=' + PUBLIC_KEY +
            'forUsername=' + userName +
            '&part=snippet';

            return this._http.get<any>(queryUrl, this.getHeaders());
    }

    private getHeaders()  {
        const token = localStorage.getItem('access_token');
        let headers = new HttpHeaders();
        headers = headers.append('Content-type',  'application/x-www-form-urlencoded');
        headers = headers.append('Accept', 'aapplication/json');
        headers = headers.append('Authorization', 'Bearer ' + token);

        return {headers: headers};
    }
}
