import { Component, OnInit, Input } from '@angular/core';

import { Video } from 'core/models';

@Component({
    selector: 'app-video-list-item',
    templateUrl: './video-list-item.component.html',
    styleUrls: ['./video-list-item.component.scss']
})
export class VideoListItemComponent implements OnInit {

    @Input() video: Video;
    @Input() index: Video;

    constructor() { }

    ngOnInit() {
    }

    handleThumUrl(thumbUrl, type) {
        if (thumbUrl.indexOf('jpg') === -1) {
            return 'assets/images/' + type + '.png';
        }
        return thumbUrl;
    }

}
