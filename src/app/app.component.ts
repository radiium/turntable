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

import { UUID } from 'angular2-uuid';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreatePlaylistDialogComponent } from 'shared/dialogs/create-playlist-dialog/create-playlist-dialog.component';

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
    onSelectPLID: string;

    loading: any = false;

    @ViewChild('plScrollContainer') scrollContainer: ElementRef;
    isOnDrag: boolean;
    showPlayerBar: boolean;
    scroll: any;

    miniNav = false;
    isLoaded = false;

    constructor(
    public snackBar: MatSnackBar,
    public  dialog: MatDialog,
    private appStateService: AppStateService,
    private dataService: DataService,
    private Electron: ElectronService,
    private authService: AuthService,
    private YTService: YoutubeService,
    private overlayContainer: OverlayContainer,
    private dndService: DndService,
    private translate: TranslateService) {

        translate.setDefaultLang('en');

        // User
        this.dataService.user$.subscribe((user) => {
            this.user = user;
            if (user !== null) {
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

        // Get selected playlist
        this.onSelectPLID = '';
        this.dataService.onSelectPL$.subscribe((pl: any) => {
            this.onSelectPLID = pl ? pl.id : '';
        });


        this.dndService.initDnd();
        this.appStateService.loadAppState();

        // Load a local playlist for development
        if (isDevMode()) {
            // this.insertFakeData();
        }
    }

    ngOnInit() {
        // this.snackBar.open('Hey', '', {
        //    duration: 2000,
        // });
    }

    ngAfterViewInit() {
        this.dndService.plButtonContainer = this.scrollContainer;
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

    selectPlaylist(pl: Playlist) {
        this.dataService.setOnSelectPL(pl);
        this.dataService.setSelectedTab(4);
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

    addPlaylist() {
        const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
            height: 'auto',
            panelClass: 'theme-' + this.appState.theme
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = UUID.UUID();
                const title = result.name;
                const privacyStatus = 'private';

                const videoList = new Array<PlaylistItem>();
                const pl = new Playlist(
                    id, title, '', '', 0, 0, '',
                    privacyStatus, true,
                    videoList
                );

                this.playlistsList.push(pl);
                this.dataService.setPlaylistsList(this.playlistsList);
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
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
                el['title'],
                el['description'],
                el['thumbUrl'],
                el['duration'],
                el['channelTitle'],
                el['publishedAt']
            );
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
            videoList.push(video);
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
