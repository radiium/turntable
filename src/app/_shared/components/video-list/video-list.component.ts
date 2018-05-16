import { Component, OnInit, Input, Output,
    OnChanges, SimpleChanges,
    ChangeDetectionStrategy,
    ChangeDetectorRef, ContentChild, TemplateRef } from '@angular/core';

import * as _ from 'lodash';
import { PlaylistItem } from 'core/models';
import { PlayerStateService } from 'core/services/player-state.service';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnInit, OnChanges {

    @Input() videoList: Array<PlaylistItem>;

    @Input() dragBagName: String;
    @Input() useDragModel: boolean;
    @Input() draggable: boolean;
    @Input() displayType: String;
    @Input() showShadow: boolean;

    @Input() attrCopy: boolean;
    @Input() attrAcceptDrop: boolean;
    @Input() attrPlaylistId: string;
    @Input() attrFrom: string;

    @ContentChild('itemControl') itemControlTmpl: TemplateRef<any>;
    @ContentChild('footer') footerTmpl: TemplateRef<any>;

    constructor(
    private cdRef: ChangeDetectorRef,
    private playerState: PlayerStateService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.videoList.currentValue) {
            this.cdRef.detectChanges();
        }
    }

    playVideo(video: PlaylistItem, index: number) {
        if (this.dragBagName !== 'playerListBag') {
            index = undefined;
        }
        this.playerState.playVideo(video, index);
    }

    // ------------------------------------------------------------------------
    // Track video list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id;
    }
}
