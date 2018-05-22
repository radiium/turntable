import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, SearchResults, AppState } from 'core/models';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { PlayerStateService } from 'core/services/player-state.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    appState: AppState;
    searchResults: SearchResults;
    videoList: PlaylistItem[];
    playlistList: Playlist[];
    hasNextPage: boolean;
    loadNextPage: boolean;
    enableDrag: boolean;

    videoListConfig = {
        draggable: true,
        displayType: 'list',
        dragBagName: 'videolistBag',
        showShadow: false,
        attr: {
            copy: true,
            acceptDrop: false,
            playlistId: undefined,
            from: 'search'
        }
    };

    constructor(
    private dataSrv: DataService,
    private ytSrv: YoutubeService,
    private playerState: PlayerStateService) {
        this.videoList = [];
        this.dataSrv.searchResults$.subscribe((data) => {
            if (data.results.length === 1) {
                this.videoList = data.results[0];
            } else if (data.results.length > 1) {
                _.each(data.results[data.results.length - 1], (video) => {
                    this.videoList.push(video);
                });
            }
            this.searchResults = data;
            this.loadNextPage = false;
            this.hasNextPage = !!data.nextPageToken;
        });

        this.enableDrag = false;
        this.dataSrv.playlistsList$.subscribe((data) => {
            this.playlistList = data;
            this.enableDrag = data.length > 0;
        });

        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
        });
    }

    ngOnInit() {
    }

    loadMore(event) {
        this.loadNextPage = true;
        this.ytSrv.searchVideos(
            this.searchResults.query,
            this.searchResults.nextPageToken
        );
    }

    playVideo(video: PlaylistItem) {
        this.playerState.playVideo(video);
    }

    addToQueue(video: PlaylistItem) {
        this.dataSrv.setOnPlayList([...this.appState.onPlayList, video]);
    }

    trackByFn(index: number, item: any) {
        return item.id; // index;
    }
}
