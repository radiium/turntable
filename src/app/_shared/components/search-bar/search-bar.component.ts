import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import * as moment from 'moment';

import { YoutubeService } from 'core/services/youtube.service';
import { DataService } from 'core/services/data.service';
import { Suggests, SearchResults } from 'core/models';


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    search: FormControl = new FormControl();
    query: String;
    suggestsResult: String[];
    suggestsBox: boolean;
    selectedSugest: String;
    arrowkeyLocation = -1;
    searchResults: SearchResults;

    constructor(
    private YTService: YoutubeService,
    private dataService: DataService
    ) {

        // Get suggests results
        this.dataService.suggestsResult$.subscribe((data) => {
            this.query = data.query;
            this.suggestsResult = data.suggests;
        });

        // Get suggests results
        this.dataService.setSuggestsBox(false);
        this.dataService.suggestsBox$.subscribe((data) => {
            this.suggestsBox = data;
        });

        // Get search results
        this.dataService.searchResults$.subscribe((data) => {
            this.searchResults = data;
        });
    }

    ngOnInit() {
        // Search suggests when user type in search bar
        this.search.valueChanges
        .debounceTime(200)
        .switchMap((query) => {
            if (query && query !== this.selectedSugest) {
                return this.YTService.searchSuggestsVideo(query);
            } else if (!query) {
                this.dataService.setSuggestsBox(false);
            }
            return Observable.empty();
        })
        .subscribe((sr) => {
            const acList: String[] = [];
            sr[1].forEach(item => {
                acList.push(item[0].replace(sr[0], ''));
            });
            const suggests = new Suggests(sr[0], acList);

            // Clear playlist if no value
            if (this.search.value === '') {
                this.dataService.setSuggestsResult({});
                this.dataService.setSuggestsBox(false);
                this.dataService.setSearchResults({});
            } else {
                this.dataService.setSuggestsResult(suggests);
                this.dataService.setSuggestsBox(true);
            }
        });
    }

    // Select suggest
    selectSuggestion(suggest: string) {
        this.dataService.setSuggestsResult({});
        this.selectedSugest = suggest;
        this.search.setValue(suggest);
        this.dataService.setSuggestsBox(false);
        this.searchVideos(suggest);
    }

    // Search videos by selected suggest
    searchVideos(suggest: string) {
        if (suggest) {
            this.YTService.searchVideos(suggest);
            this.dataService.setSelectedTab(2);
        }
        /*
        else {
            this.dataService.setSearchResults([]);
            this.dataService.setSearchResultNextPage(null);
        }
        */
    }

    // Handle keyboard key
    getKey(event: KeyboardEvent) {
        if (this.suggestsResult) {
            switch (event.keyCode) {

            // ascii of arrow up
            case 38:
                this.arrowkeyLocation--;
                console.log(this.suggestsResult[this.arrowkeyLocation]);
                this.checkArrowKeyLocation();
                break;

            // ascii of arrow down
            case 40:
                this.arrowkeyLocation++;
                console.log(this.suggestsResult[this.arrowkeyLocation]);
                this.checkArrowKeyLocation();
                break;

            // ascii of enter
            case 13:
                let suggest = '';
                if (this.arrowkeyLocation > -1 && this.arrowkeyLocation < this.suggestsResult.length) {
                    suggest = this.query.toString() + this.suggestsResult[this.arrowkeyLocation];
                } else if (this.arrowkeyLocation === -1) {
                    suggest = this.search.value;
                }
                this.selectSuggestion(suggest);
                break;
            }
        }
    }

    // Handle arrow key in suggest popup
    checkArrowKeyLocation() {
        if (this.arrowkeyLocation < -1) {
            this.arrowkeyLocation = this.suggestsResult.length - 1;
        } else if (this.arrowkeyLocation > this.suggestsResult.length - 1) {
            this.arrowkeyLocation = -1;
        }

        if (!this.suggestsBox && this.search.value !== '') {
            this.dataService.setSuggestsBox(true);
        }
    }

    onFocus() {
        if (this.searchResults && this.searchResults.results.length > 0) {
            this.dataService.setSelectedTab(2);
        }
    }
}
