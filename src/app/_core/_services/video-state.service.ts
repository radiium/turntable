import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Video } from '../../_shared/models/video.model';
import { Suggests } from '../../_shared/models/suggests.model';

@Injectable()
export class VideoStateService {

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

    // --------------------------------------------------------

    constructor() {}

    // --------------------------------------------------------
    // Setters

    setSuggestsResult(rl)  { this.suggestsResult.next(rl); }
    setResultsList(vl)     { this.resultsList.next(vl); }

    setPlayListsList(vl)   { this.playListsList.next(vl); }
    setCurrentPlayList(vl) { this.currentPlayList.next(vl); }
    setHistoricList(hl)    { this.historicList.next(hl); }

    setPlayerLeft(pl)      { this.playerLeft.next(pl); }
    setPlayerRight(pr)     { this.playerRight.next(pr); }
    setActivePlayer(side) { this.activePlayer = side; }
    getActivePlayer()     { return this.activePlayer; }
}
