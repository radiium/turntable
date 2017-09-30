import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Playlist } from '../../../models/playlist.model';

@Component({
    selector: 'app-playlist-header',
    templateUrl: './playlist-header.component.html',
    styleUrls: ['./playlist-header.component.css']
})
export class PlaylistHeaderComponent implements OnInit, OnChanges {

    @Input()
    playlist: Playlist;
    totalDuration: Number = 0;

    constructor() { }
    ngOnInit() {
    }

    // Update total duration on change
    ngOnChanges(change: SimpleChanges) {
        if (change && change.playlist && change.playlist.currentValue) {
            let totalDuration = 0;
            change.playlist.currentValue['videolist'].forEach(el => {
                totalDuration += el.duration;
            });
            this.totalDuration = totalDuration;
        }
    }
}
