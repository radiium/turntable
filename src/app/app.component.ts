import { Component, OnInit, OnDestroy, ViewChild, ElementRef, isDevMode, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ElectronService } from 'ngx-electron';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';

import { User, Video, Playlist } from 'core/models';
import { AppStateService } from 'core/services/app-state.service';
import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { DndService } from 'core/services/dnd.service';
import * as autoScroll from 'dom-autoscroller';
import * as _ from 'lodash';

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
    selectedTab: number;
    prevSelectedTab: number;

    playlistsList: any;

    displayType: any;
    loading: any = false;
    theme: any;

    @ViewChild('scrollContainer')  scrollContainer: ElementRef;
    isOnDrag: boolean;
    scroll: any;


    constructor(
    private appState: AppStateService,
    private dataService: DataService,
    private Electron: ElectronService,
    private authService: AuthService,
    private YTService: YoutubeService,
    public dialog: MatDialog,
    private overlayContainer: OverlayContainer,
    private dndService: DndService) {

        // User
        this.dataService.user$.subscribe((user) => {
            this.user = user;
            if (user !== null) {
                this.YTService.fetchYoutubePlaylist();
            }
        });

        // Selected tab
        this.dataService.selectedTab$.subscribe((data) => {
            this.prevSelectedTab = this.selectedTab;
            this.selectedTab = data;
        });

        // Playlists
        this.playlistsList = new Array<Playlist>();
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;

            this.scroll = autoScroll([
                this.scrollContainer.nativeElement
            ], {
                margin: 70,
                maxSpeed: 6,
                scrollWhenOutside: true,
                autoScroll: () => {
                    // console.log(this.isOnDrag);
                    return this.scroll.down && this.isOnDrag;
                }
            });
        });

        // Selected tab
        this.dataService.isOnDrag$.subscribe((data) => {
            this.isOnDrag = data;
        });

        // Playlists display type
        this.dataService.displayType$.subscribe((data) => {
            this.displayType = data;
        });

        // Loading
        this.dataService.loading$.subscribe((data) => {
            this.loading = data;
        });

        // Loading
        this.dataService.theme$.subscribe((data) => {
            this.theme = data;
            this.initMatOverlay();
        });

        this.appState.loadAppState();

        // Load a local playlist for development
        if (isDevMode()) {
            // this.insertFakeData();
        }
    }

    ngAfterViewInit() {
        this.dndService.initDnd();
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

        if (this.theme === 'dark') {
            classList.add(darkTheme);
        } else if (this.theme === 'light') {
            classList.add(lightTheme);
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.scroll.destroy();
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

    onSelectTab(index) {
        this.dataService.setSelectedTab(index);
    }

    onNavBack() {
        this.dataService.setSelectedTab(this.prevSelectedTab);
        this.prevSelectedTab = null;
    }

    selectPlaylist(pl: Playlist) {
        this.dataService.setOnSelectPL(pl);
        this.dataService.setSelectedTab(4);
    }

    changeDisplayType(evt) {
        this.dataService.setDisplayType(evt.value);
    }

    refreshYTPlaylists() {
        this.YTService.fetchYoutubePlaylist();
    }

    addPlaylist() {
        const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
            height: 'auto',
            panelClass: 'theme-' + this.theme
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = UUID.UUID();
                const title = result.name;
                const privacyStatus = 'private';

                const videoList = new Array<Video>();
                const pl = new Playlist(
                    id, title, '', '', 0, 0, '',
                    privacyStatus, true,
                    videoList
                );

                this.playlistsList.push(pl);
                this.dataService.setPlaylistsList(this.playlistsList);

                // Store local playlist in user data
                this.appState.storeLocalPlaylists();
            }
        });
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

        const videoList = new Array<Video>();
        testPlaylist['testPlaylist']['videolist'].forEach(el => {
            const video = new Video(
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
