import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { User, PlaylistItem, Playlist, AppState, Loader } from 'core/models';
import { AppStateService } from 'core/services/app-state.service';
import { AuthService } from 'core/services/auth.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { DndService } from 'core/services/dnd.service';
import { PlaylistService } from 'core/services/playlist.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

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

        this.dataSrv.user$.subscribe((data) => {
            this.user = data;
            if (data !== null) {
                this.ytSrv.fetchYoutubePlaylists();
            }
        });

        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            this.initMatOverlay();
            translate.use(this.appState.langage);
        });

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
        this.appStateSrv.initAppData();

        this.appStateSrv.getOs((os) => {
            console.log('PLATFORM', os);
            if (os === 'darwin') {
            }
        })
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.appp.nativeElement.addEventListener('mousemove', this.onMove.bind(this));
            this.appp.nativeElement.addEventListener('dragover', this.onMove.bind(this));
            this.appp.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
            document.addEventListener("mouseout", this.onMouseOut.bind(this));
        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            this.appp.nativeElement.removeEventListener('mousemove', this.onMove.bind(this));
            this.appp.nativeElement.removeEventListener('dragover', this.onMove.bind(this));
            this.appp.nativeElement.removeEventListener('mouseup', this.onMouseUp.bind(this));
            document.removeEventListener("mouseout", this.onMouseOut.bind(this));
        });
    }

    onDropSuccess(event) {
        const dragData = event.dragData;
        if (dragData) {
            if (dragData.type === 'PlayList') {
                // const playlist: Playlist = dragData.playlist as Playlist;
                this.plSrv.addToPlayerListByType(dragData.plType, dragData.plId);
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
    setIsMiniSideBar() {
        if (this.isMiniSideBar === true) {
            this.resize(250);
        } else if (this.isMiniSideBar === false) {
            this.resize(44);
        }
    }

    onMouseDown(event: MouseEvent) {
        this.onGrab = true;
    }

    onMouseUp(event?: MouseEvent) {
        this.onGrab = false;
        // event.preventDefault();
    }

    onMouseOut(e: MouseEvent) {
        const evnt: any = e ? e : window.event;
        var from = evnt.relatedTarget || evnt.toElement;
        if (from === null) {
            this.onMouseUp(evnt);
        }
        if (evnt.clientX < 44) {
            if (!this.onGrab) return;
            this.resize(evnt.clientX)
        }
    }
    
    onDrag(event) {
        event.dataTransfer.setDragImage(new Image(), 0, 0);
    }

    onMove(event: MouseEvent) {
        if (!this.onGrab) return;
        this.resize(event.clientX);
    }

    resize(x) {
        if (x < 150) {
            this.dataSrv.setIsMiniSideBar(true);
            this.sideNav.nativeElement.style.width = '44px';

        } else if(x > 150 && x < 400) {
            this.dataSrv.setIsMiniSideBar(false);
            this.sideNav.nativeElement.style.width = (x - 5) + 'px';
        }
    }
}
