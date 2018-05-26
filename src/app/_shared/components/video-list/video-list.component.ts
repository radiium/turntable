import { Component, Input, Output, OnChanges, SimpleChanges,
    ViewChild, ContentChild, TemplateRef, ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, VideoListConfig } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { DndService } from 'core/services/dnd.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import {  } from 'core/services/playlist-item.service';
import { Base64Images } from 'core/models/base64-images';
import { DragImage } from "shared/modules/ngx-dnd/ngx-dnd.config";
import { PlaylistService } from 'core/services/playlist.service';


@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnChanges {

    @Input() videoList: PlaylistItem[] = [];
    @Input() playlistId: string;
    @Input() config: VideoListConfig;
    @Input() canAddToPlaylist: boolean;

    deletable: boolean;
    confirmDelete: boolean;

    @Output() videoListOut = new EventEmitter();
    @ViewChild('listRef') listRef: ElementRef;
    @ContentChild('itemControl') itemControlTmpl: TemplateRef<any>;
    @ContentChild('footer') footerTmpl: TemplateRef<any>;

    dragImage: DragImage;

    constructor(
    private ytSrv: YoutubeService,
    private plSrv: PlaylistService,
    private dataSrv: DataService,
    private playerState: PlayerStateService,
    private cdRef: ChangeDetectorRef) {
        
        // this.initDeleteBtn();
        this.dragImage = new DragImage(Base64Images.playlistItem, 20, 20);
    }

    // Update index (text and dataset)
    reIndexItems() {
        /*
        if (this.config.attr.from !== 'search') {
            if (this.listRef) {
                const elements = this.listRef.nativeElement.children;
                const len = elements.length;
                console.log('REINDEX from ' + this.config.attr.from, len);
                for (let i = 0; i < len; i++) {
                    const el = elements[i];
                    el.getElementsByClassName('itemIndex')[0].innerHTML = i + 1;
                    el.dataset.index = i + '';
                }
            }
        }
        */
    }

    initDeleteBtn() {
        if (this.config) {
            this.deletable = this.config.attr.from !== 'search';
            this.confirmDelete = this.config.attr.from === 'onplay' || this.config.attr.from === 'historic';
        }
        this.cdRef.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.videoList && changes.videoList.currentValue) {
            this.videoList = changes.videoList.currentValue;
            // this.cdRef.detectChanges();
            // this.reIndexItems();
        }

        if (changes.playlistId && changes.playlistId.currentValue) {
            this.playlistId = changes.playlistId.currentValue;
            // this.cdRef.detectChanges();
        }

        if (changes.config && changes.config.currentValue) {
            this.config = changes.config.currentValue;
            this.deletable = (this.config.attr.from !== 'search');
            // this.cdRef.detectChanges();
        }

        if (changes.canAddToPlaylist && changes.canAddToPlaylist.currentValue) {
            this.canAddToPlaylist = changes.canAddToPlaylist.currentValue;
            // this.cdRef.detectChanges();
        }

        this.initDeleteBtn();
    }

    onDragStart(event) {
        this.dataSrv.setOnDragData(event);
    }

    onDropSuccess(event) {
        this.dataSrv.setOnDragData(null);
    }

    // Menu action
    playVideo(video: PlaylistItem, index: number) {
        this.plSrv.playVideo(video, index);
    }

    addToPlayerList(video: PlaylistItem) {
        this.plSrv.addToPlayerList(video);
    }

    addToPlaylist(video: PlaylistItem) {
        this.plSrv.addToPlaylistMulti(video, this.playlistId);
    }

    download(video: PlaylistItem) {
        this.plSrv.download(video);
    }

    deleteVideo(video: PlaylistItem, index: number, withoutConfirm?: boolean) {
        this.plSrv.deleteVideo(video, index, this.playlistId, withoutConfirm);
    }


    // Menu sort action
    moveToTop(index: number, event) {
        this.move(index, 0);
    }

    up(index: number, event) {
        this.move(index, index - 1);
    }

    down(index: number, event) {
        this.move(index, index + 1);
    }

    moveToBottom(index: number, event) {
        this.move(index, this.videoList.length - 1);
    }

    private move(from, to) {
        this.plSrv.moveVideo(from, to, this.playlistId, this.listRef.nativeElement.children[to]);
    }

    trackByFn(index: number, item: any) {
        return item.id;
    }
}
