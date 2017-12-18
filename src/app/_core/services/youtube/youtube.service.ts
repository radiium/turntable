import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { mergeMap } from 'rxjs/operators';
import * as moment from 'moment';

import { HttpClientService } from '../http/http-client.service';

import { DataService } from '../data.service';

import { User,
         Video,
         Suggests,
         Playlist } from '../../models';

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
    // private playlistsService: PlaylistsService,
    // private playlistItemsService: PlaylistItemsService,
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
}
