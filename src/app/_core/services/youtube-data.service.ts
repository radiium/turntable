import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions,
    Response, Jsonp, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/Rx';

import { HttpService } from './http.service';
import { Video } from '../../_shared/models/video.model';
import { Playlist } from '../../_shared/models/playlist.model';
import { CONSTANT } from '../../_shared/constant';

@Injectable()
export class YoutubeDataService {

    constructor(
    private _http: Http,
    private _jsonp: Jsonp,
    private httpService: HttpService) {}

    maxResult: Number = 50;



    // ------------------------------------------------------------------------
    //
    // => PLAYLISTS
    //
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // Get all playlist of user
    getPlaylists() {
        const allPlaylistsUrl =
            CONSTANT.PLAYLIST_API +
            '?part=snippet,status' +
            '&maxResults=' + this.maxResult +
            '&mine=true';

        return this.httpService
        .request(allPlaylistsUrl, {method: RequestMethod.Get, headers: new Headers()})
        .map((res: Response) => res.json());
    }

    // ------------------------------------------------------------------------
    // Insert a playlist
    insertPlaylist(playlist: Playlist) {
        const PlaylistsUrl =
            CONSTANT.PLAYLIST_API +
            '?part=snippet,status' +
            '&snippet.title=' + playlist.title +
            '&snippet.description=' + playlist.description +
            '&snippet.tags[]=' +
            '&snippet.defaultLanguage=fr' +
            '&status.privacyStatus=' + playlist.privacyStatus;

        return this.httpService
        .request(PlaylistsUrl, {method: RequestMethod.Post, headers: new Headers()})
        .map((res: Response) => res.json());
    }

    /* Not implemented

    // ------------------------------------------------------------------------
    // Update a playlist
    updatePlaylist(playlist: Playlist) {
        const PlaylistsUrl =
            CONSTANT.PLAYLIST_API +
            '?part=snippet,status' +
            'id=' + playlist.id +
            '&snippet.title=' + playlist.title +
            '&snippet.description=' + playlist.description +
            '&snippet.tags[]=' +
            '&snippet.defaultLanguage=fr' +
            '&status.privacyStatus=' + playlist.privacyStatus;

        return this.httpService
        .request(PlaylistsUrl, {method: RequestMethod.Put, headers: new Headers()})
        .map((res: Response) => res.json());
    }
    */

    // ------------------------------------------------------------------------
    // Delete playlist
    deletePlaylist(playlistId: string) {
        const PlaylistsUrl =
            CONSTANT.PLAYLIST_API +
            '?id=' + playlistId;

        return this.httpService
        .request(PlaylistsUrl, {method: RequestMethod.Delete, headers: new Headers()})
        .map((res: Response) => res.json());
    }


    // ------------------------------------------------------------------------
    //
    // => PLAYLIST ITEMS
    //
    // ------------------------------------------------------------------------

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
            '&maxResults=' + this.maxResult;

        if (pageToken) {
            playlistItemsUrl += '&pageToken=' + pageToken;
        }

        return this.httpService
        .request(playlistItemsUrl, {method: RequestMethod.Get, headers: new Headers()})
        .map((res) => res.json());
    }

    // ------------------------------------------------------------------------
    // Insert playlist items
    insertPlaylistItems(playlistId: string, video: Video, position: string) {
        const playlistItemsUrl =
            CONSTANT.PLAYLIST_ITEMS_API +
            '?snippet.playlistId=' + playlistId +
            '&snippet.resourceId.kind=youtube#video' +
            '&snippet.resourceId.videoId=' + video.id +
            '&snippet.position=' + position +
            '&part=snippet,contentDetails,status';

        return this.httpService
        .request(playlistItemsUrl, {method: RequestMethod.Post, headers: new Headers()})
        .map((res) => res.json());
    }

    // ------------------------------------------------------------------------
    // Update playlist items
    updatePlaylistItems(playlistId: string, video: Video, position: string) {
        const playlistItemsUrl =
            CONSTANT.PLAYLIST_ITEMS_API +
            '?snippet.playlistId=' + playlistId +
            '&snippet.resourceId.kind=video' +
            '&snippet.resourceId.videoId=' + video.id +
            '&snippet.position=' + position +
            '&part=snippet,contentDetails,status';

        return this.httpService
        .request(playlistItemsUrl, {method: RequestMethod.Put, headers: new Headers()})
        .map((res) => res.json());
    }

    // ------------------------------------------------------------------------
    // Delete playlist items
    deletePlaylistItems(playlistItemId: string) {

        // Set url
        const playlistItemsUrl =
            CONSTANT.PLAYLIST_ITEMS_API +
            '?playlistId=' + playlistItemId;

        return this.httpService
        .request(playlistItemsUrl, {method: RequestMethod.Delete, headers: new Headers()})
        .map((res) => res.json());
    }



    // ------------------------------------------------------------------------
    //
    // => SEARCH/SUGGEST VIDEOS
    //
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // Search video(s) by query string
    searchVideos(query: String) {

        const searchVideosUrl =
            CONSTANT.SEARCH_API +
            '?q=' + query +
            '&key=' + CONSTANT.KEY_API +
            '&part=snippet' +
            '&maxResults=' + this.maxResult; // +
            // '&videoEmbeddable=true';

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
            '?part=snippet,contentDetails,status,player' +
            '&id=' + videosId +
            '&key=' + CONSTANT.KEY_API;

        return this._http
        .request(videosByIdUrl, {method: RequestMethod.Get, headers: new Headers()})
        .map((res) => res.json());
    }
}
