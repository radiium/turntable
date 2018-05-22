import { Injectable } from '@angular/core';
import { Subject ,  BehaviorSubject } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';

import { User, Playlist, PlaylistItem,
    Suggests, SearchResults, AppState,
    Loader } from 'core/models';

@Injectable()
export class DataService {


    // User infos
    private user  = new Subject<User>();
    public  user$ = this.user.asObservable();


    // App state
    private appState  = new BehaviorSubject<AppState>(new AppState());
    public  appState$ = this.appState.asObservable();


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
    private playlistsList  = new Subject<Playlist[]>();
    public  playlistsList$ = this.playlistsList.asObservable();


    // Loading state
    private loader  = new BehaviorSubject<Loader>({panel: false, global: true});
    public  loader$ = this.loader.asObservable();

    constructor() { }


    setUser(data) {
        this.user.next(_.cloneDeep(data));
    }

    // App State
    setAppState(data)      { this.appState.next(data); }
    setLangage(data)       { this.setAppStateKey('langage', data); }
    setTheme(data)         { this.setAppStateKey('theme', data); }
    setDisplayType(data)   { this.setAppStateKey('displayType', data); }
    setSelectedTab(data)   { this.setAppStateKey('selectedTab', data); }
    setShowPlayerBar(data) { this.setAppStateKey('showPlayerBar', data); }
    setIsMiniSideBar(data) { this.setAppStateKey('isMiniSideBar', data); }
    setMultiPlayer(data)   { this.setAppStateKey('multiPlayer', data); }
    setSelectedPl(data)    { this.setAppStateKey('selectedPl', data); }
    setOnPlayList(data)    { this.setAppStateKey('onPlayList', data); }
    setHistoricList(data)  { this.setAppStateKey('historicList', data); }
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

    setLoader(data) {
        this.loader.next(_.cloneDeep(data));
    }

    setLoaderGlobal(data) {
        const loader = this.loader.getValue();
        loader.global = data;
        this.setLoader(loader);
    }

    setLoaderPanel(data) {
        const loader = this.loader.getValue();
        loader.panel = data;
        this.setLoader(loader);
    }
}
