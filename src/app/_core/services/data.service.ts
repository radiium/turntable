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

}
