import { Injectable } from '@angular/core';

import { Video } from '../../_shared/models/video.model';
import { Playlist } from '../../_shared/models/playlist.model';

@Injectable()
export class CopyService {


    constructor() {}

    // Copy Playlist
    copyPlaylist(playlist: Playlist, videolist?: Array<Video>) {
        let vl = new Array<Video>();
        if (videolist) {
            vl = videolist.slice();
        } else {
            vl = playlist.videolist.slice();
        }
        const pl = new Playlist(
            playlist.id,
            playlist.title,
            playlist.description,
            playlist.thumbUrl,
            playlist.thumbH,
            playlist.thumbW,
            playlist.publishedAt,
            playlist.privacyStatus,
            playlist.isLocal,
            vl
        );
        return pl;
    }
}
