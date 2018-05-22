import { Component, OnInit, ViewChild, ElementRef, ApplicationRef,
    ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, AppState, VideoListConfig } from 'core/models';
import { DataService } from 'core/services/data.service';
import { DndService } from 'core/services/dnd.service';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html',
    styleUrls: ['./playlist-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistDetailsComponent implements OnInit {

    appState: AppState;
    currentPlaylist: Playlist;
    playlistsList: Playlist[];

    canAddToPlaylist: boolean;

    title: string;
    description: string;
    privacyStatus: string;

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
    private dataService: DataService,
    private dnd: DndService) {

        this.title = '';
        this.description = '';
        this.privacyStatus = '';
        this.canAddToPlaylist = false;

        // Get selected playlist
        this.dataService.appState$.subscribe((data) => {
            this.appState = data;
            this.currentPlaylist = _.find(this.playlistsList, { id: data.selectedPl });
            this.updateState();
            this.cdRef.markForCheck();
            // this.appRef.tick();
        });

        // Get playlist list
        this.dataService.playlistsList$.subscribe((data) => {
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
    }

    ngOnInit() {
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
