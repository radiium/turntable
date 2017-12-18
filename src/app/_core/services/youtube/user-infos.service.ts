import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { PUBLIC_KEY } from './public-key';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class UserInfosService {

    private ENDPOINT = 'https://www.googleapis.com/oauth2/v1/userinfo';

    constructor(
    private _http: HttpClientService
    ) { }

    public getUserInfos(token: string) {
        const userinfosUrl =
            this.ENDPOINT +
            '?access_token=' + localStorage.getItem('access_token');

        return this._http.get(userinfosUrl);
    }
}
