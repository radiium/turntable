import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/observable/forkJoin';

import * as moment from 'moment';


import { User,
    Video,
    Suggests,
    Playlist } from '../../models';

import { HttpClientService } from '../http/http-client.service';
import { DataService } from '../data.service';

import { VideosService } from './videos.service';
import { PlaylistsService } from './playlists.service';
import { PlaylistItemsService } from './playlist-items.service';
import { SearchService } from './search.service';
import { SuggestService } from './suggest.service';
import { UserInfosService } from './user-infos.service';

import * as _ from 'lodash';
@Injectable()
export class YoutubeService {


    constructor(
    private playlistsService: PlaylistsService,
    private playlistItemsService: PlaylistItemsService,
    private dataService: DataService,
    private searchService: SearchService,
    private videosService: VideosService,
    private suggestService: SuggestService,
    // private userInfosService: UserInfosService
    ) {
        console.log('lodash', _);
    }


    // ------------------------------------------------------------------------
    // Search suggestions by query string
    searchSuggestsVideo(query: String) {
        return this.suggestService.searchSuggestsVideo(query);
    }


    // ------------------------------------------------------------------------
    // Search video(s) by query string
    searchVideos(query: String) {
        this.searchService.searchVideos(query)
        .mergeMap((searchResults) => {
            const idList = [];
            searchResults['items'].forEach(item => {
                idList.push(item.id.videoId);
            });
            return this.videosService.getVideosById(idList.join(','));
        })
        .subscribe((videoResults) => {
            const videoList = videoResults['items'].map(item => {
                return new Video(
                    item.id,
                    item.snippet.title,
                    item.snippet.description,
                    item.snippet.thumbnails.default.url,
                    moment.duration(item.contentDetails.duration).asMilliseconds()
                );
            });
            this.dataService.setSearchResultPL(videoList);
        });
    }


    // Fetch and load user playlist(s) and his video(s)
    // Into playlistslist Observable
    fetchYoutubePlaylist() {

        // Get all playlist
        this.playlistsService.getPlaylists()
        .flatMap((plList) => {

            this.dataService.setProgressBarValue(30);

            // Get all playlist items for each playlist
            const aRequest = [];
            plList['items'].forEach((playlist, i) => {
                const req = this.playlistItemsService.getPlaylistItems(playlist.id, '')
                // Recursive call for playlist items
                .expand((data: any) => this.playlistItemsService.getPlaylistItems(playlist.id, data.nextPageToken), 1)
                // Group each response by 'items' field
                .pluck('items')
                // Concat each items in array
                .scan((array: any, data) => {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            array.push(data[key]);
                        }
                    }
                    return array;
                }, [])
                // Get last observable
                .last()
                .flatMap((plItemsList) => {
                    // Parse videos id
                    const videoIdList = this.parseVideoId(plItemsList);
                    const aReq = [];
                    // Get videos metadatas
                    videoIdList.forEach(videoIds => {
                        const reqVideo = this.videosService.getVideosById(videoIds);
                        aReq.push(reqVideo);
                    });
                    const fork = Observable.forkJoin(aReq)
                    // Parse videos metadatas in video object
                    .map((res) => {
                        const videoList = [];
                        res.forEach((el: any, index) => {
                            el.items.forEach(video => {
                                if (video.status.embeddable) {
                                    const objVideo = this.parseVideo(video);
                                    videoList.push(objVideo);
                                }
                            });
                        });

                        this.dataService.setProgressBarValue(90);

                        // Create playlist object
                        return this.parsePlaylist(playlist, videoList);
                    });
                    return fork;
                });

                aRequest.push(req);
            });
            return Observable.forkJoin(aRequest);
        })
        .subscribe((playlistList) => {
            this.dataService.setProgressBarValue(99);

            this.dataService.setPlayListsList(playlistList);
            // this.playListsList.push(playlistList); ------------------------------------ <===

            // Set playlistlist
            this.dataService.playListsList$.subscribe((pll) => {
                pll.forEach((playlist: Playlist) => {
                    playlistList.push(playlist);
                });
            });
        });
    }

    // Get all video id from an array of playlist items
    parseVideoId(playlistItemsList) {
        const videosIdList = [];
        for (const key in playlistItemsList) {
            if (playlistItemsList.hasOwnProperty(key)) {
                const videoId = playlistItemsList[key].snippet.resourceId.videoId;
                videosIdList.push(videoId);
            }
        }
        return this.concatVideoIdBy50(videosIdList);
    }

    // Set videos id list to array of string
    // Each string contains a maximum of 50 videos id
    concatVideoIdBy50(videosIdList) {
        const aVideoId = [];
        do {
            aVideoId.push(videosIdList.slice(0, 50).join(','));
            videosIdList = videosIdList.slice(50);

        } while (videosIdList.length !== 0);
        return aVideoId;
    }

    // Parse and convert playlist object from YouTube api to app playlist object
    /* Playlist resource model
    id: string,
    title: string,
    description: string,
    thumbUrl: string,
    thumbH: number,
    thumbW: number,
    publishedAt: string,
    privacyStatus: string,
    isLocal: boolean,
    videolist?: Video[]): Playlist
    */
    parsePlaylist(playlist: any, videolist?: Video[]) {
        return new Playlist(
            playlist.id,
            playlist.snippet.localized.title,
            playlist.snippet.localized.description,
            playlist.snippet.thumbnails.default.url,
            playlist.snippet.thumbnails.default.height,
            playlist.snippet.thumbnails.default.width,
            playlist.snippet.publishedAt,
            playlist.status.privacyStatus,
            false,
            videolist
        );
    }

    // Parse and convert video object from YouTube api to app video object
    /* Video resource model
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbUrl = thumbUrl;
    this.duration = duration;
    */
    parseVideo(video: any) {
        return new Video(
            video.id,
            video.snippet.localized.title,
            video.snippet.localized.description,
            video.snippet.thumbnails.default.url,
            moment.duration(video.contentDetails.duration).asMilliseconds()
        );
    }
}
