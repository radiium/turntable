import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import * as moment from 'moment';

import { SuggestsModel } from '../_shared/_models/suggests.model';
import { VideoModel } from '../_shared/_models/video.model';
import { VideoService } from '../_shared/_services/video.service';
import { VideoStateService } from '../_shared/_services/video-state.service';

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
        public VideoService: VideoService,
        public VideoStateService: VideoStateService) {

            // Bind suggests results
            VideoStateService.suggestsResult$.subscribe((suggestsResult) => {
                this.query = suggestsResult.query;
                this.suggestsResult = suggestsResult.suggests;
            });
    }

    ngOnInit() {
        this.search.valueChanges
        .debounceTime(200)
        .switchMap((query) => {
            if (query && query !== this.selectedSugest) {
                return this.VideoService.searchSuggestsVideo(query);
            } else {
                return Observable.empty();
            }
        })
        .subscribe((sr) => {

            const acList: String[] = [];
            sr[1].forEach(item => {
                acList.push(item[0].replace(sr[0], ''));
            });
            const suggests = new SuggestsModel(sr[0], acList);

            // Clear playlist if no value
            if (this.search.value === '') {
                this.VideoStateService.setSuggestsResult({});
            } else {
                this.VideoStateService.setSuggestsResult(suggests);
            }
        });
    }

    selectSuggestion(suggest: String) {
        this.VideoStateService.setSuggestsResult({});
        this.selectedSugest = suggest;
        this.search.setValue(suggest);
        this.searchSuggestion(suggest);
    }

    searchSuggestion(suggest: String) {
        this.VideoService.search(suggest)
        .subscribe((results) => {
            // Clear playlist if no value
            if (this.search.value === '') {
                this.VideoStateService.setResultsList([]);
            } else {
                this.VideoStateService.setResultsList(results.items.map(item => {
                    return new VideoModel(
                        item.id,
                        item.snippet.title,
                        item.snippet.thumbnails.default.url,
                        item.snippet.channelTitle,
                        item.snippet.channelId,
                        item.snippet.description,
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




/*

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import * as moment from 'moment';

import { VideoModel } from '../_shared/_models/video.model';
import { VideoService } from '../_shared/_services/video.service';
import { VideoStateService } from '../_shared/_services/video-state.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    search = new FormControl();

    constructor(
        public VideoService: VideoService,
        public VideoStateService: VideoStateService) {
    }

    ngOnInit() {
        this.search.valueChanges
        .debounceTime(600)
        .switchMap((query) => this.VideoService.searchVideo(query))
        .subscribe((results) => {

            // Clear playlist if no value
            if (this.search.value === '') {
                this.VideoStateService.setResultsList([]);

            } else {
                this.VideoStateService.setResultsList(results.items.map(item => {
                    return new VideoModel(
                        item.id,
                        item.snippet.title,
                        item.snippet.thumbnails.default.url,
                        item.snippet.channelTitle,
                        item.snippet.channelId,
                        item.snippet.description,
                        moment.duration(item.contentDetails.duration).asMilliseconds()
                    );
                }));
            }
        });
    }
}

*/
