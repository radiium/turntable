import { Injectable } from '@angular/core';
import { Subject ,  BehaviorSubject } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';

import { User, Playlist, Video, Suggests, SearchResults, AppState } from 'core/models';

@Injectable()
export class DataService {


    // User infos
    private user  = new Subject<User>();
    public  user$ = this.user.asObservable();


    // App state
    private appState  = new BehaviorSubject<any>(new AppState());
    public  appState$ = this.appState.asObservable();


    // On drag event
    private isOnDrag  = new BehaviorSubject<boolean>(false);
    public  isOnDrag$ = this.isOnDrag.asObservable();


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


    // Selected playlist
    private onSelectPL  = new Subject<Playlist>();
    public  onSelectPL$ = this.onSelectPL.asObservable();


    // On play videolist
    private onPlayList  = new Subject<Array<Video>>();
    public  onPlayList$ = this.onPlayList.asObservable();


    // On play historic videolist
    private historicList  = new Subject<Array<Video>>();
    public  historicList$ = this.historicList.asObservable();


    constructor() { }


    setUser(data) {
        this.user.next(_.cloneDeep(data));
    }

    setAppState(data) {
        this.appState.next(data);
    }
    setLangage(data)       { this.setAppStateKey('langage', data); }
    setTheme(data)         { this.setAppStateKey('theme', data); }
    setDisplayType(data)   { this.setAppStateKey('displayType', data); }
    setSelectedTab(data)   { this.setAppStateKey('selectedTab', data); }
    setShowPlayerBar(data) { this.setAppStateKey('showPlayerBar', data); }
    setLoading(data)       { this.setAppStateKey('loading', data); }
    setIsMiniSideBar(data) { this.setAppStateKey('isMiniSideBar', data); }
    setAppStateKey(key: string, value: any) {
        const appState = this.appState.getValue();
        appState[key] = value;
        this.setAppState(appState);
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

    setOnSelectPL(data) {
        this.onSelectPL.next(_.cloneDeep(data));
    }

    setOnPlayList(data) {
        this.onPlayList.next(_.cloneDeep(data));
    }

    setHistoricList(data) {
        this.historicList.next(_.cloneDeep(data));
    }

    setIsOnDrag(data) {
        this.isOnDrag.next(data);
    }
}
