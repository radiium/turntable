import { Component, Input, Output, ViewChild, ContentChild, TemplateRef, ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, VideoListConfig, PlayListType } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { DndService } from 'core/services/dnd.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { Base64Images } from 'core/models/base64-images';
import { DragImage } from "shared/modules/ngx-dnd/ngx-dnd.config";
import { PlaylistService } from 'core/services/playlist.service';


@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent {

    _playlist: Playlist;
    @Input()
    set playlist(playlist: Playlist) {
        this._playlist = playlist;

        if (playlist) {
            this.initVar();
            this.initVideoList();
        }
        this.cdRef.detectChanges();
    }

    get playlist() {
        return this._playlist;
    }

    // Original videoList
    _videoList: PlaylistItem[] = [];
    _videoListLen: number;

    // Loadable videoList
    _items: PlaylistItem[] = [];
    _itemsLen: number;

    // Number of item to add on scroll
    _step: number;

    sortable: boolean;
    deletable: boolean;
    confirmDelete: boolean;
    disableInfiniteScroll: boolean;
    @Input() canAddToPlaylist: boolean;

    dragImage: DragImage;

    @ViewChild('listRef') listRef: ElementRef;
    @ContentChild('footer') footerTmpl: TemplateRef<any>;

    constructor(
    private ytSrv: YoutubeService,
    private plSrv: PlaylistService,
    private dataSrv: DataService,
    private playerState: PlayerStateService,
    private cdRef: ChangeDetectorRef) {
        
        this._step = 5;
        this.dragImage = new DragImage(Base64Images.playlistItem, 20, 20);
    }

   
    initVideoList() {
        if (this.disableInfiniteScroll) {
            this._items = this.playlist.videolist;

        } else {
            this._videoList    = this.playlist.videolist;
            this._videoListLen = this.playlist.videolist.length;
    
            this._itemsLen = (this._videoListLen < this._itemsLen)
                ? this._videoListLen : this._step;
    
            this._items = this.playlist.videolist.slice(0, this._itemsLen);

            if (this.listRef) {
                this.listRef.nativeElement.scrollIntoView();
            }
        }
    }

    initVar() {
        switch (this.playlist.type) {
            case PlayListType.PLAYLIST:
                this.sortable = true;
                this.deletable = true;
                this.confirmDelete = true;
                this.disableInfiniteScroll = false;
                break;

            case PlayListType.ONPLAY:
                this.sortable = true;
                this.deletable = true;
                this.confirmDelete = false;
                this.disableInfiniteScroll = false;
                break;

            case PlayListType.HISTORIC:
                this.sortable = false;
                this.deletable = true;
                this.confirmDelete = false;
                this.disableInfiniteScroll = false;
                break;

            case PlayListType.WATCHLATER:
                this.sortable = true;
                this.deletable = true;
                this.confirmDelete = true;
                this.disableInfiniteScroll = false;
                break;

            case PlayListType.SEARCH:
                this.sortable = false;
                this.deletable = false;
                this.confirmDelete = false;
                this.disableInfiniteScroll = true;
                break;
        
            default:
                this.sortable = false;
                this.deletable = false;
                this.confirmDelete = false;
                this.disableInfiniteScroll = true;
                break;
        }
    }

    // Menu action
    playVideo(video: PlaylistItem, index: number) {
        this.plSrv.playVideo(video, index);
    }

    addToPlayerList(video: PlaylistItem) {
        this.plSrv.addToPlayerList(video);
    }

    addToPlaylist(video: PlaylistItem) {
        this.plSrv.addToPlaylistMulti(video, this._playlist.id);
    }

    download(video: PlaylistItem) {
        this.plSrv.download(video);
    }

    deleteVideo(video: PlaylistItem, index: number, withoutConfirm?: boolean) {
        this.plSrv.deleteVideoOnPlaylist(video, index, this._playlist.type, this._playlist.id, withoutConfirm);
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
        this.move(index, this._videoListLen - 1);
    }

    private move(from, to) {
        this.plSrv.moveVideo(from, to, this._playlist.type, this._playlist.id/*, this.listRef.nativeElement.children[to]*/);
    }

    onDropSuccess(event) {
        for (let i = 0; i < this._items.length; i++) {
            this._videoList[i] = this._items[i];
        }
        this.plSrv.updatePlaylist(this._playlist);
    }

    // Infinite scroll
    onScrollDown (ev) {
        if (this._videoListLen === this._itemsLen) return;
        
        const start = this._itemsLen;
        this._itemsLen += this._step;
        if ((this._videoListLen) <= this._itemsLen) {
            this._itemsLen = this._videoListLen;
        }

        for (let i = start; i < this._itemsLen; i++) {
            const element = this._videoList[i];
            this._items.push(element);

            this._items = _.cloneDeep(this._items);
        }
        //this._videoList.push.apply([...this.videoList.slice(start, this.sum)]);
        this.cdRef.detectChanges();
    }


    // For NgFor
    trackByFn(index: number, item: any) {
        return item.id;
    }
}
