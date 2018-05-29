import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, SearchResults, AppState, PlaylistFactory, PlayListType } from 'core/models';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { PlaylistService } from 'core/services/playlist.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit {

    appState: AppState;
    searchResults: SearchResults;
    videoList: PlaylistItem[];

    searchPlaylist: Playlist;

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
    private cdRef: ChangeDetectorRef,
    private dataSrv: DataService,
    private plSrv: PlaylistService,
    private ytSrv: YoutubeService,
    private playerState: PlayerStateService) {

        this.searchPlaylist = PlaylistFactory.create(PlayListType.SEARCH, {});

        this.videoList = [];

        this.dataSrv.searchResults$.subscribe((data) => {
            if (data.results.length === 1) {
                this.searchPlaylist.videolist = data.results[0];
            } else if (data.results.length > 1) {
                this.searchPlaylist.videolist = [
                    ...this.searchPlaylist.videolist,
                    ...data.results[data.results.length - 1]
                ];
            }

            this.searchPlaylist = _.cloneDeep(this.searchPlaylist);
            this.searchResults = data;
            this.loadNextPage = false;
            this.hasNextPage = !!data.nextPageToken;
            this.cdRef.markForCheck();
        });

        this.enableDrag = false;
        this.dataSrv.playlistsList$.subscribe((data) => {
            this.playlistList = data;
            this.enableDrag = data.length > 0;
            this.cdRef.markForCheck();
        });

        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            this.cdRef.markForCheck();
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
        this.plSrv.addToPlayerList(video);
    }

    trackByFn(index: number, item: any) {
        return item.id; // index;
    }
}
