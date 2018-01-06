import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';

import { User, Playlist, Video, Suggests } from '../models';

@Injectable()
export class DataService {


    // User infos
    private user  = new Subject<User>();
    public  user$ = this.user.asObservable();


    // Tabs
    private selectedTab  = new Subject<any>();
    public  selectedTab$ = this.selectedTab.asObservable();


    // Suggest list
    private suggestsResult  = new Subject<Suggests>();
    public  suggestsResult$ = this.suggestsResult.asObservable();


    // Suggest box state
    private suggestsBox  = new Subject<boolean>();
    public  suggestsBox$ = this.suggestsBox.asObservable();


    // Search result PlayList
    private searchResultPL  = new Subject<Video[]>();
    public  searchResultPL$ = this.searchResultPL.asObservable();


    // PlayList list
    private playListsList  = new Subject<Array<Playlist>>();
    public  playListsList$ = this.playListsList.asObservable();


    // On edit PlayList
    private onEditPlaylist  = new Subject<Playlist>();
    public  onEditPlaylist$ = this.onEditPlaylist.asObservable();


    // On play PlayList
    private onPlayPlaylist  = new Subject<Playlist>();
    public  onPlayPlaylist$ = this.onPlayPlaylist.asObservable();


    // On play historic PlayList
    private onPlayHistoricPlaylist  = new Subject<Playlist>();
    public  onPlayHistoricPlaylist$ = this.onPlayHistoricPlaylist.asObservable();


    // Search result PlayList
    private searchResultPlaylist  = new Subject<Video[]>();
    public  searchResultPlaylist$ = this.searchResultPlaylist.asObservable();


    // Load playlist progress bar value
    private progressBarValue  = new Subject<any>();
    public  progressBarValue$ = this.progressBarValue.asObservable();


    constructor() { }


    setUser(user) {
        this.user.next(_.cloneDeep(user));
    }

    setSelectedTab(st) {
        this.selectedTab.next(st);
    }

    setSuggestsResult(suggestsResult) {
        this.suggestsResult.next(_.cloneDeep(suggestsResult));
    }

    setSuggestsBox(suggestsBox) {
        this.suggestsBox.next(suggestsBox);
    }

    setSearchResultPL(searchResultPL) {
        this.searchResultPL.next(_.cloneDeep(searchResultPL));
    }

    setPlayListsList(pl) {
        this.playListsList.next(_.cloneDeep(pl));
    }

    setOnEditPlayList(pl) {
        this.onEditPlaylist.next(_.cloneDeep(pl));
    }

    setOnPlayPlayList(pl) {
        this.onPlayPlaylist.next(_.cloneDeep(pl));
    }

    setOnPlayHistoricPlayList(pl) {
        this.onPlayHistoricPlaylist.next(_.cloneDeep(pl));
    }

    setSearchResultPlaylist(pl) {
        this.searchResultPlaylist.next(_.cloneDeep(pl));
    }

    setProgressBarValue(pbv) {
        this.progressBarValue.next(_.cloneDeep(pbv));
    }
}
