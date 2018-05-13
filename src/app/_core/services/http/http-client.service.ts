import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface HttpOptions {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'events';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
}


@Injectable()
export class HttpClientService {

    constructor(
    private http: HttpClient) {
    }

    get<T>(url: string, options?: any): Observable<HttpEvent<T>> {
        return this.http.get<T>(url, options);
    }

    post<T>(url: string, body: string, options?: any): Observable<HttpEvent<T>> {
        return this.http.post<T>(url, body, options);
    }

    put<T>(url: string, body: string, options?: any): Observable<HttpEvent<T>> {
        return this.http.put<T>(url, body, options);
    }

    delete<T>(url: string, options?: any): Observable<HttpEvent<T>> {
        return this.http.delete<T>(url, options);
    }

    patch<T>(url: string, body: string, options?: any): Observable<HttpEvent<T>> {
        return this.http.patch<T>(url, body, options);
    }

    jsonp<T>(url: string, callbackParam: string): Observable<T> {
        return this.http.jsonp<T>(url, callbackParam);
    }
}
