import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ElectronService } from 'ngx-electron';

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
        this.user.next(user);
    }

    setSelectedTab(st) {
        this.selectedTab.next(st);
    }

    setSuggestsResult(suggestsResult) {
        this.suggestsResult.next(suggestsResult);
    }

    setSearchResultPL(searchResultPL) {
        this.searchResultPL.next(searchResultPL);
    }

    setPlayListsList(pl) {
        this.playListsList.next(pl);
    }

    setOnEditPlayList(pl) {
        this.onEditPlaylist.next(pl);
    }

    setOnPlayPlayList(pl) {
        this.onPlayPlaylist.next(pl);
    }

    setOnPlayHistoricPlayList(pl) {
        this.onPlayHistoricPlaylist.next(pl);
    }

    setSearchResultPlaylist(pl) {
        this.searchResultPlaylist.next(pl);
    }

    setProgressBarValue(pbv) {
        this.progressBarValue.next(pbv);
    }
}
