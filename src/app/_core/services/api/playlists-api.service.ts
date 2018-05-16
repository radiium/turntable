import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientService } from 'core/services/http/http-client.service';
import { Observable } from 'rxjs';

@Injectable()
export class PlaylistsApiService {

    private ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlists';
    private maxResult = 50;

    constructor(
         // private _http:  HttpClient
        private _http:  HttpClientService
    ) { }

    // ------------------------------------------------------------------------
    // Get all playlist of user
    getPlaylists(): Observable<any> {
        const queryUrl =
            this.ENDPOINT +
            '?part=snippet,status' +
            '&maxResults=' + this.maxResult +
            '&mine=true';

            return this._http.get<any>(queryUrl, this.getHeaders());
    }

    // ------------------------------------------------------------------------
    // Post a playlist
    postPlaylist(playlist) {
        const queryUrl =
            this.ENDPOINT +
            '?part=snippet,status' +
            '&snippet.title=' + playlist.title +
            '&snippet.description=' + playlist.description +
            '&snippet.tags[]=' +
            '&snippet.defaultLanguage=fr' +
            '&status.privacyStatus=' + playlist.privacyStatus;

        return this._http.post<any>(queryUrl, null, this.getHeaders());
    }

    // ------------------------------------------------------------------------
    // Update a playlist
    putPlaylist(playlist) {
        const queryUrl =
            this.ENDPOINT +
            '?part=snippet,status' +
            'id=' + playlist.id +
            '&snippet.title=' + playlist.title +
            '&snippet.description=' + playlist.description +
            '&snippet.tags[]=' +
            '&snippet.defaultLanguage=fr' +
            '&status.privacyStatus=' + playlist.privacyStatus;

        return this._http.put<any>(queryUrl, null, this.getHeaders());
    }

    // ------------------------------------------------------------------------
    // Delete playlist
    deletePlaylist(playlistId: string) {
        const headers = new HttpHeaders();
        const queryUrl =
            this.ENDPOINT +
            '?id=' + playlistId;

        return this._http.delete<any>(queryUrl, this.getHeaders());
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
