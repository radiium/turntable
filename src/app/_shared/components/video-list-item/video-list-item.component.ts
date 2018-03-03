import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'core/models';

@Component({
    selector: 'app-video-list-item',
    templateUrl: './video-list-item.component.html',
    styleUrls: ['./video-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListItemComponent implements OnInit {

    @Input() movable: boolean;
    @Input() video: Video;
    @Input() index: Video;
    @Input() height: string;

    imgHeight: string;
    imgWidth: string;

    isColumn: boolean;

    constructor() {
    }

    ngOnInit() {
        this.height = this.height || '100px';
        this.imgHeight = this.height;
        this.imgWidth = (parseFloat(this.height) + (parseFloat(this.height) / 3)) + 'px';
        this.isColumn = parseFloat(this.height) > 50;
    }

    handleThumUrl(thumbUrl, type) {
        if (thumbUrl.indexOf('jpg') === -1) {
            return 'assets/images/' + type + '.png';
        }
        return thumbUrl;
    }

}
