import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import * as moment from 'moment';

import { Video } from '../models/video.model';
import { VideoStateService } from '../../_core/_services/video-state.service';
import { YoutubeService } from '../../_core/_services/youtube.service';

import { PlaylistService } from '../../_core/_services/playlist.service';

import { Suggests } from '../models/suggests.model';
import { SuggestService } from '../../_core/_services/suggest.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    search: FormControl = new FormControl();
    query: String;
    suggestsResult: String[];
    selectedSugest: String;
    arrowkeyLocation = 0;

    constructor(
        public suggestService: SuggestService,
        public playlistService: PlaylistService,
        public _youtubeService: YoutubeService) {
            // Bind suggests results
            suggestService.suggestsResult$.subscribe((suggestsResult) => {
                this.query = suggestsResult.query;
                this.suggestsResult = suggestsResult.suggests;
            });
    }

    ngOnInit() {
        this.search.valueChanges
        .debounceTime(200)
        .switchMap((query) => {
            if (query && query !== this.selectedSugest) {
                return this.suggestService.searchSuggestsVideo(query);
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
                this.suggestService.setSuggestsResult({});
            } else {
                this.suggestService.setSuggestsResult(suggests);
            }
        });
    }

    selectSuggestion(suggest: String) {
        this.suggestService.setSuggestsResult({});
        this.selectedSugest = suggest;
        this.search.setValue(suggest);
        this.searchSuggestion(suggest);
    }

    searchSuggestion(suggest: String) {

        this._youtubeService.searchVideos(suggest)
        .subscribe((results) => {

            // Clear playlist if no value
            if (this.search.value === '') {
                this.playlistService.setSearchResultPlaylist([]);
            } else {
                this.playlistService.setSearchResultPlaylist(results.items.map(item => {
                    return new Video(
                        item.id,
                        item.snippet.title,
                        item.snippet.description,
                        item.snippet.thumbnails.default.url,
                        moment.duration(item.contentDetails.duration).asMilliseconds()
                    );
                }));
            }
        });
    }


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

    checkArrowKeyLocation() {
        if (this.arrowkeyLocation < 0) {
            this.arrowkeyLocation = 0;
        } else if (this.arrowkeyLocation > this.suggestsResult.length - 1) {
            this.arrowkeyLocation = this.suggestsResult.length - 1;
        }
    }
}
