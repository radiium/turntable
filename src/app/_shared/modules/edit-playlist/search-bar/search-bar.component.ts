import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import * as moment from 'moment';

import { YoutubeService } from 'core/services/youtube.service';
import { DataService } from 'core/services/data.service';
import { Suggests } from 'core/models';


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

    constructor(
    private YTService: YoutubeService,
    private dataService: DataService
    ) {

        // Get suggests results
        this.dataService.suggestsResult$.subscribe((suggestsResult) => {
            this.query = suggestsResult.query;
            this.suggestsResult = suggestsResult.suggests;
        });

        // Get suggests results
        this.dataService.setSuggestsBox(false);
        this.dataService.suggestsBox$.subscribe((suggestsBox) => {
            this.suggestsBox = suggestsBox;
        });
    }

    ngOnInit() {
        // Search suggests when user type in search bar
        this.search.valueChanges
        .debounceTime(200)
        .switchMap((query) => {
            if (query && query !== this.selectedSugest) {
                return this.YTService.searchSuggestsVideo(query);
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
                this.dataService.setSearchResults([]);
                this.dataService.setSuggestsBox(false);
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
        this.searchVideos(suggest);
        this.dataService.setSuggestsBox(false);
    }

    // Search videos by selected suggest
    searchVideos(suggest: string) {
        this.YTService.searchVideos(suggest);
    }

    // Handle keyboard key
    getKey(event: KeyboardEvent) {
        if (this.suggestsResult) {
            switch (event.keyCode) {

            // ascii of arrow up
            case 38:
                this.arrowkeyLocation--;
                this.checkArrowKeyLocation();
                break;

            // ascii of arrow down
            case 40:
                this.arrowkeyLocation++;
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
    }
}
