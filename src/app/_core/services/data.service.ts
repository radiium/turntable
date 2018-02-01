import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';

import { User, Playlist, Video, Suggests, SearchResults } from 'core/models';

@Injectable()
export class DataService {


    // User infos
    private user  = new Subject<User>();
    public  user$ = this.user.asObservable();


    // Langage (en or fr)
    private langage  = new BehaviorSubject<any>('en');
    public  langage$ = this.langage.asObservable();


    // Theme (light or dark)
    private theme  = new BehaviorSubject<any>('dark');
    public  theme$ = this.theme.asObservable();


    // Display Type (grid or list)
    private displayType  = new BehaviorSubject<any>('grid');
    public  displayType$ = this.displayType.asObservable();


    // Selected tabs
    private selectedTab  = new BehaviorSubject<any>(1);
    public  selectedTab$ = this.selectedTab.asObservable();


    // Suggest list
    private suggestsResult  = new Subject<Suggests>();
    public  suggestsResult$ = this.suggestsResult.asObservable();


    // Suggest box state
    private suggestsBox  = new Subject<boolean>();
    public  suggestsBox$ = this.suggestsBox.asObservable();


    // Search result PlayList
    private searchResults  = new Subject<SearchResults>();
    public  searchResults$ = this.searchResults.asObservable();


    // PlayList list
    private playlistsList  = new Subject<Array<Playlist>>();
    public  playlistsList$ = this.playlistsList.asObservable();


    // On edit PlayList
    private onEditPlaylist  = new Subject<Playlist>();
    public  onEditPlaylist$ = this.onEditPlaylist.asObservable();

    // Selected playlist
    private onSelectPL  = new Subject<Playlist>();
    public  onSelectPL$ = this.onSelectPL.asObservable();

    // On play PlayList
    private onPlayPlaylist  = new Subject<Playlist>();
    public  onPlayPlaylist$ = this.onPlayPlaylist.asObservable();


    // On play historic PlayList
    private onPlayHistoricPlaylist  = new Subject<Playlist>();
    public  onPlayHistoricPlaylist$ = this.onPlayHistoricPlaylist.asObservable();


    // Search result PlayList
    private searchResultPlaylist  = new Subject<Video[]>();
    public  searchResultPlaylist$ = this.searchResultPlaylist.asObservable();


    // Loading spinner
    private loading  = new Subject<any>();
    public  loading$ = this.loading.asObservable();

    // On drag event
    private isOnDrag  = new BehaviorSubject<boolean>(false);
    public  isOnDrag$ = this.isOnDrag.asObservable();

    constructor() { }


    setUser(data) {
        this.user.next(_.cloneDeep(data));
    }

    setLangage(data) {
        this.langage.next(data);
    }

    setTheme(data) {
        this.theme.next(data);
    }

    setDisplayType(data) {
        this.displayType.next(data);
    }

    setSelectedTab(data) {
        this.selectedTab.next(data);
    }

    setSuggestsResult(data) {
        this.suggestsResult.next(_.cloneDeep(data));
    }

    setSuggestsBox(data) {
        this.suggestsBox.next(data);
    }

    setSearchResults(data) {
        this.searchResults.next(_.cloneDeep(data));
    }

    setPlaylistsList(data) {
        this.playlistsList.next(_.cloneDeep(data));
    }

    setOnEditPlayList(data) {
        this.onEditPlaylist.next(_.cloneDeep(data));
    }

    setOnSelectPL(data) {
        this.onSelectPL.next(_.cloneDeep(data));
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

    setLoading(data) {
        this.loading.next(data);
    }

    setIsOnDrag(data) {
        this.isOnDrag.next(data);
    }
}
