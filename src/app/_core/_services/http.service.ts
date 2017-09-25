
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';

@Injectable()
export class HttpService extends Http {

    authService: AuthService;

    constructor (
        backend: XHRBackend,
        options: RequestOptions,
        auth: AuthService) {
            super(backend, options);
            this.authService = auth;
    }

    request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        const token = localStorage.getItem('access_token');
        if (typeof url === 'string') {
            if (!options) {
                options = {headers: new Headers()};
            }
            options.headers.append('Content-type', 'application/x-www-form-urlencoded');
            options.headers.append('Accept', 'application/json');
            options.headers.append('Authorization', `Bearer ${token}`);
        } else {
            url.headers.set('Authorization', `Bearer ${token}`);
        }
        return super.request(url, options)
        .catch((res: Response) => {
            // Handle invalid token status code and retry request
            if (res.status === 401 || res.status === 403) {
                this.authService.getAccessToken();
                return super.request(url, options);
            }
            return Observable.throw(res);
        });
    }
}
