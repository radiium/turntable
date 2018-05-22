import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, ApplicationRef,
    ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, AppState, VideoListConfig, Loader } from 'core/models';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistDetailsComponent implements OnInit, AfterViewInit, AfterViewChecked {

    appState: AppState;
    currentPlaylist: Playlist;
    playlistsList: Playlist[];

    canAddToPlaylist: boolean;

    title: string;
    description: string;
    privacyStatus: string;

    loader: Loader;

    videoListConfig: VideoListConfig = {
        draggable: true,
        displayType: 'list',
        dragBagName: 'videolistBag',
        showShadow: true,
        attr: {
            copy: false,
            acceptDrop: true,
            playlistId: '',
            from: 'detail'
        }
    };


    @ViewChild('itemControl') itemControl;
    @ViewChild('pldScrollContainer') set container(scrollContainer: ElementRef) {
        this.dnd.plDetailContainer = scrollContainer;
    }

    constructor(
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private dataSrv: DataService,
    private dnd: DndService) {

        this.title = '';
        this.description = '';
        this.privacyStatus = '';
        this.canAddToPlaylist = false;

        // Get selected playlist
        this.dataSrv.appState$.subscribe((data) => {
            this.appState = data;
            this.currentPlaylist = _.find(this.playlistsList, { id: data.selectedPl });
            this.updateState();
            this.cdRef.markForCheck();
            // this.appRef.tick();
        });

        // Get playlist list
        this.dataSrv.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
            if (this.currentPlaylist) {
                this.currentPlaylist = _.find(this.playlistsList, { id: this.currentPlaylist.id });
            } else if (!this.currentPlaylist && this.playlistsList.length > 0) {
                this.currentPlaylist = this.playlistsList[0];
            } else {
                this.currentPlaylist = null;
            }
            this.canAddToPlaylist = data.length > 1;
            this.cdRef.detectChanges();
        });
        this.dataSrv.loader$.subscribe((data) => {
            this.loader = data;
            this.cdRef.markForCheck();
        });
    }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        if (this.loader.global) {
            console.log('TADADA1')
            setTimeout(() => {
                this.dataSrv.setLoaderGlobal(false);
            }, 3000);
        }
    }

    ngAfterViewInit() {
        /*
        if (this.loader.global) {
            console.log('TADADA2')
            setTimeout(() => {
                this.dataSrv.setLoaderGlobal(false);
            }, 3000);
        }
        */
    }

    updateState() {
        if (this.currentPlaylist) {
            this.title = this.currentPlaylist.title;
            this.description = this.currentPlaylist.description;
            this.privacyStatus = this.currentPlaylist.privacyStatus;
            // this.videoListConfig.attr.playlistId = this.playlist.id;
            // this.cdRef.markForCheck();
        }
    }

    getConfig(plId): VideoListConfig {
        return {
            draggable: true,
            displayType: 'list',
            dragBagName: 'videolistBag',
            showShadow: true,
            attr: {
                copy: false,
                acceptDrop: true,
                playlistId: plId,
                from: 'detail'
            }
        };
    }

    // ------------------------------------------------------------------------
    // Track item in ngFor
    trackByFn(index: number, item: any) {
        return item.id; // index;
    }
}
