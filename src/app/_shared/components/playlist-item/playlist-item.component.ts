import { Component, Input } from '@angular/core';

import { Video } from '../../models/video.model';


@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent {

    @Input()
    public video: Video;

    constructor() {}
}
