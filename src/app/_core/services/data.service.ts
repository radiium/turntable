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


    // Display Type (grid, thumb or list)
    private displayType  = new Subject<any>();
    public  displayType$ = this.displayType.asObservable();


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


    setUser(data) {
        this.user.next(_.cloneDeep(data));
    }

    setSelectedTab(data) {
        this.selectedTab.next(data);
    }

    setDisplayType(data) {
        this.displayType.next(data);
    }

    setSuggestsResult(data) {
        this.suggestsResult.next(_.cloneDeep(data));
    }

    setSuggestsBox(data) {
        this.suggestsBox.next(data);
    }

    setSearchResultPL(data) {
        this.searchResultPL.next(_.cloneDeep(data));
    }

    setPlayListsList(data) {
        this.playListsList.next(_.cloneDeep(data));
    }

    setOnEditPlayList(data) {
        this.onEditPlaylist.next(_.cloneDeep(data));
    }

    setOnPlayPlayList(data) {
        this.onPlayPlaylist.next(_.cloneDeep(data));
    }

    setOnPlayHistoricPlayList(data) {
        this.onPlayHistoricPlaylist.next(_.cloneDeep(data));
    }

    setSearchResultPlaylist(data) {
        this.searchResultPlaylist.next(_.cloneDeep(data));
    }

    setProgressBarValue(data) {
        this.progressBarValue.next(_.cloneDeep(data));
    }
}
