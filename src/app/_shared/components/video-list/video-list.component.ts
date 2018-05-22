import { Component, Input, Output, OnChanges, SimpleChanges,
    ViewChild, ContentChild, TemplateRef, ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { Playlist, PlaylistItem, VideoListConfig } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';
import { DndService } from 'core/services/dnd.service';
import { DataService } from 'core/services/data.service';
import { YoutubeService } from 'core/services/youtube.service';
import { PlaylistItemService } from 'core/services/playlist-item.service';



@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnChanges {

    @Input() videoList: PlaylistItem[];
    @Input() playlistId: string;
    @Input() config: VideoListConfig;
    @Input() canAddToPlaylist: boolean;

    deletable: boolean = false;

    @Output() videoListOut = new EventEmitter();
    @ViewChild('listRef') listRef: ElementRef;
    @ContentChild('itemControl') itemControlTmpl: TemplateRef<any>;
    @ContentChild('footer') footerTmpl: TemplateRef<any>;


    constructor(
    private ytSrv: YoutubeService,
    private plItemSrv: PlaylistItemService,
    private data: DataService,
    private playerState: PlayerStateService,
    private cdRef: ChangeDetectorRef) {
    }

    // Update index (text and dataset)
    reIndexItems() {
        if (this.config.attr.from !== 'search') {
            const elements = this.listRef.nativeElement.children;
            const len = elements.length;
            for (let i = 0; i < len; i++) {
                const el = elements[i];
                el.getElementsByClassName('itemIndex')[0].innerHTML = i + 1;
                el.dataset.index = i + '';
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.videoList && changes.videoList.currentValue) {
            this.videoList = changes.videoList.currentValue;
            this.cdRef.detectChanges();
            this.reIndexItems();
        }

        if (changes.playlistId && changes.playlistId.currentValue) {
            this.playlistId = changes.playlistId.currentValue;
            this.cdRef.detectChanges();
        }

        if (changes.config && changes.config.currentValue) {
            this.config = changes.config.currentValue;
            this.deletable = (this.config.attr.from !== 'search');
            this.cdRef.detectChanges();
        }

        if (changes.canAddToPlaylist && changes.canAddToPlaylist.currentValue) {
            this.canAddToPlaylist = changes.canAddToPlaylist.currentValue;
            this.cdRef.detectChanges();
        }
    }

    playVideo(video: PlaylistItem, index: number) {
        this.plItemSrv.playVideo(video, index);
    }

    addToPlayerList(video: PlaylistItem) {
        this.plItemSrv.addToPlayerList(video);
    }

    addToPlaylist(video: PlaylistItem) {
        this.plItemSrv.addToPlaylist(video, this.playlistId);
    }

    download(video: PlaylistItem) {
        this.plItemSrv.download(video);
    }

    deleteVideo(video: PlaylistItem, index: number) {
        this.plItemSrv.deleteVideo(video, index, this.playlistId);
    }


    // Move/sort item
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

    move(from, to) {

        this.plItemSrv.moveVideo(from, to, this.playlistId, this.listRef.nativeElement.children[to])
        /*
        if (to === from) {
            return;
        }

        const target = this.videoList[from];
        const increment = to < from ? -1 : 1;

        for (let k = from; k !== to; k += increment) {
            this.videoList[k] = this.videoList[k + increment];
        }

        this.videoList[to] = target;

        setTimeout(() => {
            this.listRef.nativeElement.children[to].scrollIntoView({behavior: 'auto'});
        });
        this.videoListOut.emit(this.videoList);
        */
    }

    // ------------------------------------------------------------------------
    // Track video list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id;
    }
}
