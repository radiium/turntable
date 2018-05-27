import { Component, OnInit, OnDestroy, ViewChild,
    ElementRef, isDevMode, ViewEncapsulation, QueryList,
    HostListener, AfterViewInit, ContentChild, ViewChildren, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { UUID } from 'angular2-uuid';
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
    isMiniSideBar: boolean;
    loader: Loader;

    onGrab: boolean;
    @ViewChild('appp') appp: ElementRef
    @ViewChild('sideNav') sideNav: ElementRef
    @ViewChild('content') content: ElementRef

    constructor(
    private appStateSrv: AppStateService,
    private plSrv: PlaylistService,
    private dataSrv: DataService,
    private Electron: ElectronService,
    private zone: NgZone,
    private authSrv: AuthService,
    private ytSrv: YoutubeService,
    private overlayContainer: OverlayContainer,
    private dndSrv: DndService,
    private translate: TranslateService) {

        this.miniNav = false;
        this.onGrab = false;
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

        this.dataSrv.isMiniSideBar$.subscribe((data) => {
            this.isMiniSideBar = data;
        });

        this.dataSrv.loader$.subscribe((data) => {
            this.loader = data;
        });

        //this.dndSrv.initDnd();
        this.appStateSrv.loadAppState();

        this.appStateSrv.getOs((os) => {
            console.log('PLATFORM', os);
            if (os === 'darwin') {
            }
        })
    }

    ngAfterViewInit() {
        // Load a local playlist for development
        // if (isDevMode()) { }
        setTimeout(() => {
            this.insertFakeData();
        });
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.appp.nativeElement.addEventListener('mousemove', this.onMove.bind(this));
            this.appp.nativeElement.addEventListener('dragover', this.onMove.bind(this));
            this.appp.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            this.appp.nativeElement.removeEventListener('mousemove', this.onMove.bind(this));
            this.appp.nativeElement.removeEventListener('dragover', this.onMove.bind(this));
            this.appp.nativeElement.removeEventListener('mouseup', this.onMouseUp.bind(this));
        });
    }

    onDropSuccess(event) {
        console.log('PLAYER BTN', event.srcElement);
        const dragData = event.dragData;
        if (dragData) {
            if (dragData.type === 'PlayList') {
                const playlist: Playlist = dragData.playlist as Playlist;
                this.plSrv.addToPlayerList(playlist);
            } else if (dragData.type === 'PlayListItem') {
                const video: PlaylistItem = dragData.video as PlaylistItem;
                this.plSrv.addToPlayerList(video);
            }
        }
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
        const newValue = !this.isMiniSideBar;
        if (newValue === true) {
            this.sideNav.nativeElement.style.width = '44px';
        } else if (newValue === false) {
            this.sideNav.nativeElement.style.width = '250px';
        }
        this.dataSrv.setIsMiniSideBar(newValue);
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

    // Resize splitter
    onMouseDown(event: MouseEvent) { this.onGrab = true; }
    onMouseUp(event: MouseEvent) { this.onGrab = false; }
    onDrag(event) { event.dataTransfer.setDragImage(new Image(), 0, 0); }

    onMove(event: MouseEvent) {
        this.resize(event);
    }

    resize(event) {
        if (!this.onGrab) return;
        if (event.clientX < 150) {
            this.dataSrv.setIsMiniSideBar(true);
        } else {
            this.dataSrv.setIsMiniSideBar(false);
        }
        // const wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (event.clientX > 44 && event.clientX < 400) {
            this.sideNav.nativeElement.style.width = (event.clientX - 5) + 'px';
        }
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
                el['publishedAt'],
                UUID.UUID()
            );

            for (let i = 0; i < 1; i++) {
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
            videoList,
            UUID.UUID()
        );
        // this.playlistsList = <Playlist[]>[datas];
        this.dataSrv.setPlaylistsList(<Playlist[]>[datas]);
    }
}
