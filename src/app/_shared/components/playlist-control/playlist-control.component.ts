import { Component, Input } from '@angular/core';

import { PlaylistService } from 'core/services/playlist.service';
import { Playlist } from 'core/models';

@Component({
    selector: 'app-playlist-control',
    templateUrl: './playlist-control.component.html',
    styleUrls: ['./playlist-control.component.scss'],
})
export class PlaylistControlComponent {

    @Input() playlist: Playlist;
    @Input() show: boolean;

    constructor(
    private plSrv: PlaylistService) {
    }

    setPlayerPlaylist() {
        this.plSrv.setPlayerList(this.playlist);
    }

    addToPlayerPlaylist() {
        this.plSrv.addToPlayerList(this.playlist);
    }

    showPlaylist() {
        this.plSrv.showPlaylist(this.playlist);
    }

    editPlaylist() {
        this.plSrv.editPlaylistInfos(this.playlist);
    }

    deletePlaylist() {
        this.plSrv.deletePlaylist(this.playlist);
    }
}
