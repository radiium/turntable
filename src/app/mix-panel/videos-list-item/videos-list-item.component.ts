import { Component, Input } from '@angular/core';

import { Video } from '../../_shared/models/video.model';


@Component({
  selector: 'app-videos-list-item',
  templateUrl: './videos-list-item.component.html',
  styleUrls: ['./videos-list-item.component.css']
})
export class VideosListItemComponent {

    @Input('videoModel')
    public videoModel: Video;

    constructor() {}
}
