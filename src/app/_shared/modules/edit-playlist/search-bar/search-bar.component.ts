import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import 'rxjs/Rx';

import { Video } from '../../../models/video.model';
import { YoutubeService } from '../../../../_core/services/youtube.service';
import { PlaylistService } from '../../../../_core/services/playlist.service';
import { Suggests } from '../../../models/suggests.model';
import { SuggestService } from '../../../../_core/services/suggest.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    search: FormControl = new FormControl();
    query: String;
    suggestsResult: String[];
    selectedSugest: String;
    arrowkeyLocation = 0;

    constructor(
        private _suggestService: SuggestService,
        private _playlistService: PlaylistService,
        private _youtubeService: YoutubeService) {

            // Get suggests results
            this._suggestService.suggestsResult$.subscribe((suggestsResult) => {
                this.query = suggestsResult.query;
                this.suggestsResult = suggestsResult.suggests;
            });
    }

    ngOnInit() {
        // Search suggests when user type in search bar
        this.search.valueChanges
        .debounceTime(200)
        .switchMap((query) => {
            if (query && query !== this.selectedSugest) {
                return this._suggestService.searchSuggestsVideo(query);
            } else {
                return Observable.empty();
            }
        })
        .subscribe((sr) => {

            const acList: String[] = [];
            sr[1].forEach(item => {
                acList.push(item[0].replace(sr[0], ''));
            });
            const suggests = new Suggests(sr[0], acList);

            // Clear playlist if no value
            if (this.search.value === '') {
                this._suggestService.setSuggestsResult({});
            } else {
                this._suggestService.setSuggestsResult(suggests);
            }
        });
    }

    // Select suggest
    selectSuggestion(suggest: String) {
        this._suggestService.setSuggestsResult({});
        this.selectedSugest = suggest;
        this.search.setValue(suggest);
        this.searchSuggestion(suggest);
    }

    // Search videos by selected suggest
    searchSuggestion(suggest: String) {

        this._youtubeService.searchVideos(suggest)
        .subscribe((results) => {

            // Clear playlist if no value
            if (this.search.value === '') {
                this._playlistService.setSearchResultPlaylist([]);
            } else {
                const videoList = results.items.map(item => {
                    return new Video(
                        item.id,
                        item.snippet.title,
                        item.snippet.description,
                        item.snippet.thumbnails.default.url,
                        moment.duration(item.contentDetails.duration).asMilliseconds()
                    );
                });
                this._playlistService.setSearchResultPlaylist(videoList);
            }
        });
    }

    // Handle keyboard key
    keyDown(event: KeyboardEvent) {
        if (this.suggestsResult) {
            switch (event.keyCode) {
                case 38: // this is the ascii of arrow up
                    this.arrowkeyLocation--;
                    this.checkArrowKeyLocation();
                    break;
                case 40: // this is the ascii of arrow down
                    this.arrowkeyLocation++;
                    this.checkArrowKeyLocation();
                    break;
                case 13:
                    const suggest = this.query.toString() + this.suggestsResult[this.arrowkeyLocation];
                    this.selectSuggestion(suggest);
                    break;
            }
        }
    }

    // Handle arrow key in suggest popup
    checkArrowKeyLocation() {
        if (this.arrowkeyLocation < 0) {
            this.arrowkeyLocation = 0;
        } else if (this.arrowkeyLocation > this.suggestsResult.length - 1) {
            this.arrowkeyLocation = this.suggestsResult.length - 1;
        }
    }
}
