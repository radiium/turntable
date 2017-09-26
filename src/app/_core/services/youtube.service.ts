import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import { HttpService } from './http.service';
import { Subject } from 'rxjs/Subject';
import { Playlist } from '../../_shared/models/playlist.model';
import { CONSTANT } from '../../_shared/constant';

@Injectable()
export class YoutubeService {

    constructor(
        private _http: Http,
        private _jsonp: Jsonp,
        private httpService: HttpService) {}

    // ------------------------------------------------------------------------
    // Get all playlist of user
    getAllPlaylists() {
        const allPlaylistsUrl =
            CONSTANT.PLAYLIST_API +
            '?mine=true' +
            '&maxResults=50' +
            '&part=snippet,status';

        return this.httpService.request(allPlaylistsUrl, {method: RequestMethod.Get, headers: new Headers()})
        .map((res: Response) => res.json());
    }

    // ------------------------------------------------------------------------
    // Get playlist items
    getPlaylistItems(playlistId: string, pageToken: string) {

        if (typeof pageToken === 'undefined') {
            return Observable.empty();
        }

        // Set url
        let playlistItemsUrl =
            CONSTANT.PLAYLIST_ITEMS_API +
            '?playlistId=' + playlistId +
            '&part=snippet,contentDetails' +
            '&maxResults=50';

        if (pageToken) {
            playlistItemsUrl += '&pageToken=' + pageToken;
        }

        return this.httpService.request(playlistItemsUrl, {method: RequestMethod.Get, headers: new Headers()})
        .map((res) => res.json());
    }

    // ------------------------------------------------------------------------
    //
    createPlaylist() {
    }

    // ------------------------------------------------------------------------
    //
    updatePlaylist() {
    }

    // ------------------------------------------------------------------------
    //
    deletePlaylist() {
    }

    // ------------------------------------------------------------------------
    // Search video(s) by query string
    searchVideos(query: String) {

        const searchVideosUrl =
            CONSTANT.SEARCH_API +
            '?q=' + query +
            '&key=' + CONSTANT.KEY_API +
            '&part=snippet' +
            '&maxResults=10';

        return this._http.get(searchVideosUrl)
        .map((res: Response) => res.json())
        .flatMap((searchData) => {
            const idList = [];
            searchData.items.forEach(item => {
                idList.push(item.id.videoId);
            });
            return this.getVideosById(idList.join(','));
        });
    }

    // ------------------------------------------------------------------------
    // Search video(s) by id
    getVideosById(videosId: string) {

        const videosByIdUrl =
            CONSTANT.VIDEO_API +
            '?part=snippet,contentDetails' +
            '&id=' + videosId +
            '&key=' + CONSTANT.KEY_API;

        return this._http.request(videosByIdUrl, {method: RequestMethod.Get, headers: new Headers()})
        .map((res) => res.json());
    }
}
