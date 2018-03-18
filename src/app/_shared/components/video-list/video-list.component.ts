import { Component, OnInit, Input, Output,
    OnChanges, SimpleChanges,
    ChangeDetectionStrategy,
    ChangeDetectorRef, ContentChild, TemplateRef } from '@angular/core';

import * as _ from 'lodash';
import { Video } from 'core/models';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnInit {

    @Input() dragBagName: String;
    @Input() useDragModel: boolean;
    @Input() videoList: Array<Video>;
    @Input() displayType: String;
    @Input() showShadow: boolean;

    @Input() attrCopy: boolean;
    @Input() attrAcceptDrop: boolean;
    @Input() attrPlaylistId: string;
    @Input() attrFrom: string;


    @Input() draggable: boolean;
    @Input() reorderable: boolean;
    @Input() deletable: boolean;
    @Input() playable: boolean;

    @Input() playCallback: Function;
    @Input() deleteCallback: Function;


    @ContentChild('itemControl') itemControlTmpl: TemplateRef<any>;

    @ContentChild('footer') footerTmpl: TemplateRef<any>;

    constructor(
    private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        /*
        console.log('ngOnChanges', changes);
        if (changes.videoList.currentValue) {
        }
        */
    }

    // ------------------------------------------------------------------------
    // Track video list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id;
    }


    playVideo(video) {
        this.playCallback(video);
    }

    deleteVideo(video) {
        this.deleteCallback(video)
    }






}
