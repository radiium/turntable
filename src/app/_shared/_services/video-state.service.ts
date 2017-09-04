import { Injectable, Input } from '@angular/core';
import { VideoModel } from '../_models/video.model';
import { Subject } from 'rxjs/Subject';

import { SuggestsModel } from '../_models/suggests.model';

@Injectable()
export class VideoStateService {


    private suggestsResult = new Subject<SuggestsModel>();
    suggestsResult$ = this.suggestsResult.asObservable();
    // SearchBar results list
    private resultsList = new Subject<VideoModel[]>();
    resultsList$ = this.resultsList.asObservable();

    // PlayList
    playList = new Subject<VideoModel[]>();
    playList$ = this.playList.asObservable();

    // HistoricList
    historicList = new Subject<VideoModel[]>();
    historicList$ = this.historicList.asObservable();

    // Player video left
    private playerLeft = new Subject<VideoModel>();
    playerLeft$  = this.playerLeft.asObservable();

    // Player video right
    private playerRight = new Subject<VideoModel>();
    playerRight$ = this.playerRight.asObservable();

    // Active player (left)
    private activePlayer: String = null; // = new Subject<VideoModel>();
    isFirstPlay: Boolean = true;
    // activePlayer$ = this.activePlayer.asObservable();

    constructor() {}

    // Setters
    setSuggestsResult(rl) { this.suggestsResult.next(rl); }
    setResultsList(vl) { this.resultsList.next(vl); }
    setPlayList(vl) { this.playList.next(vl); }
    setHistoricList(hl) { this.playList.next(hl); }

    setPlayerLeft(pl) { this.playerLeft.next(pl); }
    setPlayerRight(pr) { this.playerRight.next(pr); }

    setActivePlayer(side) { this.activePlayer = side; }
    getActivePlayer() { return this.activePlayer; }
    // setActivePlayer(ap) { this.activePlayer.next(ap); }
}
