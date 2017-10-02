import { Component, Input } from '@angular/core';

import { Video } from '../../../models/video.model';


@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent {

    @Input()
    public video: Video;

    constructor() {}

    handleThumUrl(thumbUrl, type) {
        if (thumbUrl.indexOf('jpg') === -1) {
            return 'assets/images/' + type + '.png';
        }

        return thumbUrl;
    }
}
