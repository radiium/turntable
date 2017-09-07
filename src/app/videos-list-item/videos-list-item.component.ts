import { Component, Input } from '@angular/core';

import { VideoModel } from '../_shared/_models/video.model';


@Component({
  selector: 'app-videos-list-item',
  templateUrl: './videos-list-item.component.html',
  styleUrls: ['./videos-list-item.component.css']
})
export class VideosListItemComponent {

    @Input('videoModel')
    public videoModel: VideoModel;

    constructor() {}
}
