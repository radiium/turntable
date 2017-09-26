import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { YoutubeService } from './youtube.service';

import { Video } from '../../_shared/models/video.model';
import { Playlist } from '../../_shared/models/playlist.model';


@Injectable()
export class PlaylistService {

    // PlayList list
    playListsList = new Subject<Array<Playlist>>();
    playListsList$ = this.playListsList.asObservable();

    // On play PlayList
    onEditPlaylist = new Subject<Playlist>();
    onEditPlaylist$ = this.onEditPlaylist.asObservable();

    // On play PlayList
    onPlayPlaylist = new Subject<Playlist>();
    onPlayPlaylist$ = this.onPlayPlaylist.asObservable();

    // Search result PlayList
    searchResultPlaylist = new Subject<Playlist>();
    searchResultPlaylist$ = this.searchResultPlaylist.asObservable();

    constructor(private _youtubeService: YoutubeService) {}

    // Setters
    setPlayListsList(pl) { this.playListsList.next(pl); }
    setOnEditPlayList(pl) { this.onEditPlaylist.next(pl); }
    setOnPlayPlayList(pl) { this.onPlayPlaylist.next(pl); }
    setSearchResultPlaylist(pl) { this.searchResultPlaylist.next(pl); }


    updatePlaylist() {
                         const playlistList = new Array<Playlist>();
                    // Get all playlist
                    this._youtubeService.getAllPlaylists()
                    .subscribe((playlistsList: any) => {

                        // Get playlist items for each playlist
                        playlistsList.items.forEach(playlist => {

                            // console.log('playlist:', playlist);

                            // Get playlist info
                            const title         = playlist.snippet.localized.title;
                            const description   = playlist.snippet.localized.description;
                            const thumbH        = playlist.snippet.thumbnails.default.height;
                            const thumbW        = playlist.snippet.thumbnails.default.width;
                            const thumbUrl      = playlist.snippet.thumbnails.default.url;
                            const publishedAt   = playlist.snippet.publishedAt;
                            const privacyStatus = playlist.status.privacyStatus;

                            const playlistId = playlist.id;
                            const videoIdList: any = [];

                            this._youtubeService.getPlaylistItems(playlistId, '')
                            .expand((data: any) => this._youtubeService.getPlaylistItems(playlistId, data.nextPageToken), 1)
                            .pluck('items')
                            .subscribe(
                                (items: any) => {
                                    items.forEach(item => {
                                        videoIdList.push(item.contentDetails.videoId);
                                    });
                                },
                                (error) => { console.log('', error); },
                                () => {
                                    // Parse list of video id and group it by 50
                                    const aVideoId = [];
                                    let cuttedVideoIdList = [];
                                    const nbrLoop = parseInt((videoIdList.length / 50).toString(), 10);
                                    if (nbrLoop > 1) {
                                        aVideoId.push(videoIdList.slice(0, 50).join(','));
                                        cuttedVideoIdList = videoIdList.slice(50);

                                        for (let i = 0; i < nbrLoop; i++) {
                                            aVideoId.push(cuttedVideoIdList.slice(0, 50).join(','));
                                            cuttedVideoIdList = cuttedVideoIdList.slice(50);
                                        }
                                        aVideoId.push(cuttedVideoIdList.join(','));
                                    } else {
                                        aVideoId.push(videoIdList.join(','));
                                    }

                                    // Chain getVideosById request
                                    const aRequest = [];
                                    aVideoId.forEach(ids => {
                                        aRequest.push(this._youtubeService.getVideosById(ids));
                                    });

                                    Observable.forkJoin(aRequest)
                                    .subscribe((result) => {

                                        const videolist = [];

                                        result.forEach((el: any) => {
                                            el.items.forEach(video => {

                                                console.log(video);

                                                const vid = new Video(
                                                    video.id,
                                                    video.snippet.localized.title,
                                                    video.snippet.localized.description,
                                                    video.snippet.thumbnails.default.url,
                                                    moment.duration(video.contentDetails.duration).asMilliseconds()
                                                );
                                                videolist.push(vid);
                                            });
                                        });

                                        const pl = new Playlist(
                                            playlistId,
                                            title,
                                            description,
                                            thumbH,
                                            thumbW,
                                            thumbUrl,
                                            publishedAt,
                                            privacyStatus,
                                            videolist,
                                            false
                                        );

                                        playlistList.push(pl);

                                    });
                                }
                            );

                        });
                    });
                    this.setPlayListsList(playlistList);
    }
}
