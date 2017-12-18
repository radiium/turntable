import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PUBLIC_KEY } from './public-key';
import { HttpClientService } from '../http/http-client.service';

@Injectable()
export class PlaylistItemsService {

    private ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';
    private maxResult = 50;

    constructor(
    private _http: HttpClientService
    ) { }

    // ------------------------------------------------------------------------
    // Get playlist items
    getPlaylistItems(playlistId: string, pageToken: string) {

        if (typeof pageToken === 'undefined') {
            return Observable.empty();
        }

        let queryUrl =
            this.ENDPOINT +
            '?playlistId=' + playlistId +
            '&part=snippet,contentDetails' +
            '&maxResults=' + this.maxResult;

        if (pageToken) {
            queryUrl += '&pageToken=' + pageToken;
        }

        return this._http.get(queryUrl, this.getHeaders());
    }

    // ------------------------------------------------------------------------
    // Insert playlist items
    insertPlaylistItems(playlistId: string, video, position: string) {
        const queryUrl =
            this.ENDPOINT +
            '?snippet.playlistId=' + playlistId +
            '&snippet.resourceId.kind=youtube#video' +
            '&snippet.resourceId.videoId=' + video.id +
            '&snippet.position=' + position +
            '&part=snippet,contentDetails,status';

        return this._http.post(queryUrl, null, this.getHeaders());
    }

    // ------------------------------------------------------------------------
    // Update playlist items
    updatePlaylistItems(playlistId: string, video, position: string) {
        const queryUrl =
            this.ENDPOINT +
            '?snippet.playlistId=' + playlistId +
            '&snippet.resourceId.kind=video' +
            '&snippet.resourceId.videoId=' + video.id +
            '&snippet.position=' + position +
            '&part=snippet,contentDetails,status';

        return this._http.put(queryUrl, null, this.getHeaders());
    }

    // ------------------------------------------------------------------------
    // Delete playlist items
    deletePlaylistItems(playlistItemId: string) {
        const queryUrl =
            this.ENDPOINT +
            '?playlistId=' + playlistItemId;

        return this._http.delete(queryUrl, this.getHeaders());
    }

    private getHeaders() {
        const token = localStorage.getItem('access_token');
        let headers = new HttpHeaders();
        headers = headers.append('Content-type',  'application/x-www-form-urlencoded');
        headers = headers.append('Accept', 'aapplication/json');
        headers = headers.append('Authorization', 'Bearer ' + token);

        return {headers: headers};
    }
}
