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

    @Input() videoList: Array<Video>;

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
    private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.videoList.currentValue) {
            console.log('videoList change', this.videoList);
            this.cdRef.detectChanges();
        }

    }

    // ------------------------------------------------------------------------
    // Track video list item in ngFor
    trackByFn(index: number, item: any) {
        return item.id;
    }
}
