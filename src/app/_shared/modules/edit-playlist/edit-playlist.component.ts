import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Video } from '../../models/video.model';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../../_core/services/playlist.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit, OnChanges {

    @Input()
    playlist: Playlist;
    originalPlaylist: Playlist;
    searchResultList: Array<Video>;

    constructor(
    private _playlistService: PlaylistService) {

        // Get search result playlist
        this._playlistService.searchResultPlaylist$
        .subscribe((searchResultList) => {
            this.searchResultList = searchResultList;
        });
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);

    }

}
