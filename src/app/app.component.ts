import { Component, OnInit, OnDestroy, ViewChild,
    ElementRef, isDevMode, ViewEncapsulation,
    HostListener, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { User, PlaylistItem, Playlist, AppState } from 'core/models';
import { AppStateService } from 'core/services/app-state.service';
import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { DndService } from 'core/services/dnd.service';
import { PlaylistService } from 'core/services/playlist.service';

import * as testPlaylist from './test-playlist.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // directives: [Dragula],
    // encapsulation: ViewEncapsulation.None,
    // viewProviders: [DragulaService]

})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    user: User;
    appState: AppState;
    playlistsList: Array<Playlist>;

    loading: any = false;

    isOnDrag: boolean;
    showPlayerBar: boolean;
    scroll: any;

    miniNav = false;
    isLoaded = false;

    constructor(
    public snackBar: MatSnackBar,
    private appStateService: AppStateService,
    private plSrv: PlaylistService,
    private dataService: DataService,
    private Electron: ElectronService,
    private authService: AuthService,
    private YTService: YoutubeService,
    private overlayContainer: OverlayContainer,
    private dndService: DndService,
    private translate: TranslateService) {

        translate.setDefaultLang('en');

        // User
        this.dataService.user$.subscribe((data) => {
            this.user = data;
            if (data !== null) {
                this.YTService.fetchYoutubePlaylists();
            }
        });

        // App state
        this.appState = new AppState();
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
            this.initMatOverlay();
            translate.use(this.appState.langage);
        });

        // Playlists
        this.playlistsList = new Array<Playlist>();
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        this.dndService.initDnd();
        this.appStateService.loadAppState();
    }

    ngOnInit() {
        // this.snackBar.open('Hey', '', {
        //    duration: 2000,
        // });
    }

    ngAfterViewInit() {
        // Load a local playlist for development
        if (isDevMode()) {
            setTimeout(() => {
                this.insertFakeData();
            });
        }
    }

    ngOnDestroy() {
    }

    initMatOverlay() {
        const darkTheme = 'theme-dark';
        const lightTheme = 'theme-light';
        const classList = this.overlayContainer.getContainerElement().classList;

        if (classList.contains(lightTheme)) {
            classList.remove(lightTheme);
        }
        if (classList.contains(darkTheme)) {
            classList.remove(darkTheme);
        }

        if (this.appState.theme === 'dark') {
            classList.add(darkTheme);
        } else if (this.appState.theme === 'light') {
            classList.add(lightTheme);
        }
    }

    signin() {
        if (this.Electron.isElectronApp) {
            this.authService.login();
        }
    }

    signout() {
        if (this.Electron.isElectronApp && this.user) {
            this.authService.logout();
        }
    }

    onSelectTab(index: number) {
        this.dataService.setSelectedTab(index);
    }

    setIsMiniSideBar() {
        this.dataService.setIsMiniSideBar(!this.appState.isMiniSideBar);
    }

    setShowPlayerBar() {
        this.dataService.setShowPlayerBar(!this.appState.showPlayerBar);
    }

    refreshYTPlaylists() {
        this.YTService.fetchYoutubePlaylists();
    }

    createPlaylist() {
        this.plSrv.createPlaylist();
    }


    // Load a local playlist for development
    insertFakeData() {
        /*
        const arr = [];
        for (let i = 0; i < 25; i++) {
        arr.push(testPlaylist);
        }
        this.playlistsList = <Playlist[]>arr;
        */

        const videoList = new Array<PlaylistItem>();
        testPlaylist['testPlaylist']['videolist'].forEach(el => {
            const video = new PlaylistItem(
                el['id'],
                el['selected'],
                el['title'],
                el['description'],
                el['thumbUrl'],
                el['duration'],
                el['channelTitle'],
                el['publishedAt']
            );

            for (let i = 0; i < 40; i++) {
                videoList.push(video);
            }
        });
        const datas = new Playlist(
            testPlaylist['testPlaylist']['id'],
            testPlaylist['testPlaylist']['title'],
            testPlaylist['testPlaylist']['description'],
            testPlaylist['testPlaylist']['thumbUrl'],
            testPlaylist['testPlaylist']['thumbH'],
            testPlaylist['testPlaylist']['thumbW'],
            testPlaylist['testPlaylist']['publishedAt'],
            testPlaylist['testPlaylist']['privacyStatus'],
            true,
            videoList
        );
        // this.playlistsList = <Playlist[]>[datas];
        this.dataService.setPlaylistsList(<Playlist[]>[datas]);
    }
}
