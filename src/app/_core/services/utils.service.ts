import { Injectable } from '@angular/core';

import { PlaylistItem, Playlist } from 'core/models';


@Injectable()
export class UtilsService {


    constructor() {}

    // Copy Playlist
    copyPlaylist(playlist: Playlist, videolist?: Array<PlaylistItem>) {
        let vl = new Array<PlaylistItem>();
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

    isVideolistEqual(videolist1: Array<PlaylistItem>, videolist2: Array<PlaylistItem>) {
        if (!videolist1 || !videolist2) {
            return false;
        }

        if (videolist1.length !== videolist2.length) {
            return false;
        }

        for (let i = 0; i < videolist1.length; i++) {
            if (videolist1[i].id !== videolist2[i].id) {
                return false;
            }
        }

        return true;
    }
}
