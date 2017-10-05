import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { YoutubeDataService } from './youtube-data.service';

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

    // On play historic PlayList
    onPlayHistoricPlaylist = new Subject<Playlist>();
    onPlayHistoricPlaylist$ = this.onPlayHistoricPlaylist.asObservable();

    // Search result PlayList
    searchResultPlaylist = new Subject<Video[]>();
    searchResultPlaylist$ = this.searchResultPlaylist.asObservable();


    // Load playlist progress bar value
    progressBarValue = new Subject<any>();
    progressBarValue$ = this.progressBarValue.asObservable();

    constructor(
    private _youtubeDataService: YoutubeDataService) {
    }

    // Setters
    setPlayListsList(pl) { this.playListsList.next(pl); }
    setOnEditPlayList(pl) { this.onEditPlaylist.next(pl); }
    setOnPlayPlayList(pl) { this.onPlayPlaylist.next(pl); }
    setOnPlayHistoricPlayList(pl) { this.onPlayHistoricPlaylist.next(pl); }
    setSearchResultPlaylist(pl) { this.searchResultPlaylist.next(pl); }
    setProgressBarValue(pbv) { this.progressBarValue.next(pbv); }


    // Fetch and load user playlist(s) and his video(s)
    // Into playlistslist Observable
    fetchYoutubePlaylist() {

        // Get all playlist
        return this._youtubeDataService.getAllPlaylists()
        .flatMap((plList) => {

            this.setProgressBarValue(30);

            // Get all playlist items for each playlist
            const aRequest = [];
            plList.items.forEach((playlist, i) => {
                const req = this._youtubeDataService.getPlaylistItems(playlist.id, '')
                // Recursive call for playlist items
                .expand((data: any) => this._youtubeDataService.getPlaylistItems(playlist.id, data.nextPageToken), 1)
                // Group each response by 'items' field
                .pluck('items')
                // Concat each items in array
                .scan((array: any, data) => {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            array.push(data[key]);
                        }
                    }
                    return array;
                }, [])
                // Get last observable
                .last()
                .flatMap((plItemsList) => {
                    // Parse videos id
                    const videoIdList = this.parseVideoId(plItemsList);
                    const aReq = [];
                    // Get videos metadatas
                    videoIdList.forEach(videoIds => {
                        const reqVideo = this._youtubeDataService.getVideosById(videoIds);
                        aReq.push(reqVideo);
                    });
                    const fork = Observable.forkJoin(aReq)
                    // Parse videos metadatas in video object
                    .map((res) => {
                        const videoList = [];
                        res.forEach((el: any, index) => {
                            el.items.forEach(video => {
                                if (video.status.embeddable) {
                                    const objVideo = this.parseVideo(video);
                                    videoList.push(objVideo);
                                }
                            });
                        });

                        this.setProgressBarValue(90);

                        // Create playlist object
                        return this.parsePlaylist(playlist, videoList);
                    });
                    return fork;
                });

                aRequest.push(req);
            });
            return Observable.forkJoin(aRequest);
        })
        .subscribe((playlistList) => {
            this.setProgressBarValue(99);
            // Set playlistlist
            this.setPlayListsList(playlistList);
        });


    }

    // Get all video id from an array of playlist items
    parseVideoId(playlistItemsList) {
        const videosIdList = [];
        for (const key in playlistItemsList) {
            if (playlistItemsList.hasOwnProperty(key)) {
                const videoId = playlistItemsList[key].snippet.resourceId.videoId;
                videosIdList.push(videoId);
            }
        }
        return this.concatVideoIdBy50(videosIdList);
    }

    // Set videos id list to array of string
    // Each string contains a maximum of 50 videos id
    concatVideoIdBy50(videosIdList) {

        const aVideoId = [];
        let cuttedVideoIdList = [];

        const nbrLoop = parseInt((videosIdList.length / 50).toString(), 10);
        if (nbrLoop > 1) {
            aVideoId.push(videosIdList.slice(0, 50).join(','));
            cuttedVideoIdList = videosIdList.slice(50);

            for (let i = 0; i < nbrLoop - 1; i++) {
                aVideoId.push(cuttedVideoIdList.slice(0, 50).join(','));
                cuttedVideoIdList = cuttedVideoIdList.slice(50);
            }
            aVideoId.push(cuttedVideoIdList.join(','));
        } else {
            aVideoId.push(videosIdList.join(','));
        }

        return aVideoId;
    }

    // Parse and convert playlist object from YouTube api to app playlist object
    /* Playlist resource model
    id: string,
    title: string,
    description: string,
    thumbUrl: string,
    thumbH: number,
    thumbW: number,
    publishedAt: string,
    privacyStatus: string,
    isLocal: boolean,
    videolist?: Video[]): Playlist
    */
    parsePlaylist(playlist: any, videolist?: Video[]) {
        return new Playlist(
            playlist.id,
            playlist.snippet.localized.title,
            playlist.snippet.localized.description,
            playlist.snippet.thumbnails.default.url,
            playlist.snippet.thumbnails.default.height,
            playlist.snippet.thumbnails.default.width,
            playlist.snippet.publishedAt,
            playlist.status.privacyStatus,
            false,
            videolist
        );
    }

    // Parse and convert video object from YouTube api to app video object
    /* Video resource model
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbUrl = thumbUrl;
    this.duration = duration;
    */
    parseVideo(video: any) {
        return new Video(
            video.id,
            video.snippet.localized.title,
            video.snippet.localized.description,
            video.snippet.thumbnails.default.url,
            moment.duration(video.contentDetails.duration).asMilliseconds()
        );
    }
}

