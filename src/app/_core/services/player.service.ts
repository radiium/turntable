import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Video } from '../../_shared/models/video.model';
import { Playlist } from '../../_shared/models/playlist.model';
import { Suggests } from '../../_shared/models/suggests.model';
import { PlaylistService } from './playlist.service';
import { UtilsService } from './utils.service';

@Injectable()
export class PlayerService {

    // --------------------------------------------------------

    // Suggest list
    private suggestsResult = new Subject<Suggests>();
    suggestsResult$ = this.suggestsResult.asObservable();

    // SearchBar results list
    private resultsList = new Subject<Video[]>();
    resultsList$ = this.resultsList.asObservable();

    // --------------------------------------------------------

    // PlayList list
    playListsList = new Subject<Array<Video[]>>();
    playListsList$ = this.playListsList.asObservable();

    // Current PlayList
    currentPlayList = new Subject<Video[]>();
    currentPlayList$ = this.currentPlayList.asObservable();

    // --------------------------------------------------------

    // HistoricList
    historicList = new Subject<Video[]>();
    historicList$ = this.historicList.asObservable();

    // --------------------------------------------------------

    // Player video left
    private playerLeft = new Subject<Video>();
    playerLeft$  = this.playerLeft.asObservable();

    // Player video (right)
    private playerRight = new Subject<Video>();
    playerRight$ = this.playerRight.asObservable();

    // Active player (left)
    private activePlayer: String = null; // = new Subject<Video>();
    isFirstPlay: Boolean = true;
    // activePlayer$ = this.activePlayer.asObservable();

    onPlayHistoricPlaylist: Playlist;
    onPlayPlaylist: Playlist;

    // --------------------------------------------------------

    constructor(
    public utilsService: UtilsService,
    private _playlistService: PlaylistService) {
        this._playlistService.onPlayHistoricPlaylist$
        .subscribe((pl) => {
            this.onPlayHistoricPlaylist = pl;
        });

        this._playlistService.onPlayPlaylist$
        .subscribe((pl) => {
            this.onPlayPlaylist = pl;
        });
    }

    // --------------------------------------------------------
    // Setters

    setSuggestsResult(rl)  { this.suggestsResult.next(rl); }
    setResultsList(vl)     { this.resultsList.next(vl); }

    setPlayListsList(vl)   { this.playListsList.next(vl); }
    setCurrentPlayList(vl) { this.currentPlayList.next(vl); }
    setHistoricList(hl)    { this.historicList.next(hl); }

    setPlayerLeft(vl) {
        this.playerLeft.next(vl);
        this.updatePlaylists(vl);
    }
    setPlayerRight(vr) {
        this.playerRight.next(vr);
        this.updatePlaylists(vr);
    }

    setActivePlayer(side) { this.activePlayer = side; }
    getActivePlayer()     { return this.activePlayer; }

    // Update on play playlist and on play historic
    updatePlaylists(video: Video) {

        // Add video to on play historic playlist
        const hpl = this.utilsService.copyPlaylist(this.onPlayHistoricPlaylist);
        hpl.videolist.push(video);
        this._playlistService.setOnPlayHistoricPlayList(hpl);

        // Remove video from on play playlist
        const ppl = this.utilsService.copyPlaylist(this.onPlayPlaylist);
        let videolist = ppl.videolist;
        videolist = videolist.filter(function(el) {
            return el.id !== video.id;
        });
        ppl.videolist = videolist;
        this._playlistService.setOnPlayPlayList(ppl);
    }
}
