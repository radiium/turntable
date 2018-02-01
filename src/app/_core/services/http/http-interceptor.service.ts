import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { AuthService } from 'core/services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    auth: AuthService;

    constructor(
    private injector: Injector) {
        setTimeout(() => {
            this.auth = this.injector.get(AuthService);
        });
    }

    setHeader() {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
        headers = headers.append('Accept', 'aapplication/json');

        const token = localStorage.getItem('access_token');
        if (token) {
            headers = headers.append('Authorization', 'Bearer ' + token);
        }
        return headers;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
        .catch((error, caught) => {

            console.log('HttpResponseError Occurred', error);
            if (error.status === 401 || error.status === 403) {
                this.auth.refreshToken();
                req = req.clone({ headers: this.setHeader()});
                return next.handle(req);
            }

            return Observable.throw(error);
        }) as any;
    }
}
