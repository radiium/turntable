import { Component, OnInit, OnDestroy, ViewChild,
    ElementRef, isDevMode, ViewEncapsulation,
    HostListener, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { User, PlaylistItem, Playlist, AppState, Loader } from 'core/models';
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
    playlistsList: Playlist[];
    showPlayerBar: boolean;
    miniNav: boolean;
    loader: Loader;

    constructor(
    public snackBar: MatSnackBar,
    private appStateSrv: AppStateService,
    private plSrv: PlaylistService,
    private dataSrv: DataService,
    private Electron: ElectronService,
    private authSrv: AuthService,
    private ytSrv: YoutubeService,
    private overlayContainer: OverlayContainer,
    private dndSrv: DndService,
    private translate: TranslateService) {

        this.miniNav = false;
        translate.setDefaultLang('en');

        // User
        this.dataSrv.user$.subscribe((data) => {
            this.user = data;
            if (data !== null) {
                this.ytSrv.fetchYoutubePlaylists();
            }
        });

        // App state
        this.appState = new AppState();
        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            this.initMatOverlay();
            translate.use(this.appState.langage);
        });

        // Playlists
        this.playlistsList = [];
        this.dataSrv.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        this.dataSrv.loader$.subscribe((data) => {
            this.loader = data;
        });

        this.dndSrv.initDnd();
        this.appStateSrv.loadAppState();
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
            this.authSrv.login();
        }
    }

    signout() {
        if (this.Electron.isElectronApp && this.user) {
            this.authSrv.logout();
        }
    }

    onSelectTab(index: number) {
        this.dataSrv.setSelectedTab(index);
    }

    setIsMiniSideBar() {
        this.dataSrv.setIsMiniSideBar(!this.appState.isMiniSideBar);
    }

    setShowPlayerBar() {
        this.dataSrv.setShowPlayerBar(!this.appState.showPlayerBar);
    }

    refreshYTPlaylists() {
        this.ytSrv.fetchYoutubePlaylists();
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

        const videoList: PlaylistItem[] = [];
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
        this.dataSrv.setPlaylistsList(<Playlist[]>[datas]);
    }
}
