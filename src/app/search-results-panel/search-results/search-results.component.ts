import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { Playlist, Video, SearchResults } from 'core/models';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { SelectPlaylistDialogComponent } from 'shared/dialogs/select-playlist-dialog/select-playlist-dialog.component';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    formControl = new FormControl();

    searchResults: SearchResults;
    videoList: Array<Video>;
    playlistList: Array<Playlist>;
    hasNextPage: boolean;
    loadNextPage: boolean;

    constructor(
    private dataService: DataService,
    private YTService: YoutubeService,
    public dialog: MatDialog) {
        this.dataService.searchResults$.subscribe((data) => {
            if (data.results.length === 1) {
                this.videoList = data.results[0];
            } else if (data.results.length > 1) {
                _.each(data.results.pop(), (video) => this.videoList.push(video));
            }
            this.searchResults = data;
            this.loadNextPage = false;
            this.hasNextPage = data.nextPageToken ? true : false;
        });

        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistList = data;
        });
    }

    ngOnInit() {
    }

    loadMore(event) {
        this.loadNextPage = true;
        this.YTService.searchVideos(
            this.searchResults.query,
            this.searchResults.nextPageToken
        );
    }

    addToPlaylist(video: Video) {
        if (video && this.playlistList && this.playlistList.length > 0) {
            const dialogRef = this.dialog.open(SelectPlaylistDialogComponent, {
                height: 'auto',
                data: {
                    videoId: video.id,
                    playlistList: this.playlistList
                }
            });
            dialogRef.afterClosed().subscribe(resp => {
                if (resp) {
                    _.each(resp.plIdList, (plId) => {
                        const pl = _.find(this.playlistList, { 'id': plId });
                        pl.videolist.push(_.cloneDeep(video));
                    });
                }
            });
        }
    }

    onDragStart(event) {
        this.dataService

    }

    onDragEnd(event) {

    }
}
