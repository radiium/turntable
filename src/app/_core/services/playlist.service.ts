import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/last';


import * as moment from 'moment';
import { ElectronService } from 'ngx-electron';

import { PlaylistsService } from './youtube/playlists.service';
import { PlaylistItemsService } from './youtube/playlist-items.service';
import { VideosService } from './youtube/videos.service';

import { Video, Playlist } from '../models';


@Injectable()
export class PlaylistService {

    // PlayList list
    playListsList = new Subject<Array<Playlist>>();
    playListsList$ = this.playListsList.asObservable();

    // On edit PlayList
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
    private playlistsService: PlaylistsService,
    private playlistItemsService: PlaylistItemsService,
    private videosService: VideosService,
    private Electron: ElectronService) {
    }

    // Setters
    setPlayListsList(pl) { this.playListsList.next(pl); }
    setOnEditPlayList(pl) { this.onEditPlaylist.next(pl); }
    setOnPlayPlayList(pl) { this.onPlayPlaylist.next(pl); }
    setOnPlayHistoricPlayList(pl) { this.onPlayHistoricPlaylist.next(pl); }
    setSearchResultPlaylist(pl) { this.searchResultPlaylist.next(pl); }
    setProgressBarValue(pbv) { this.progressBarValue.next(pbv); }

    // Retrieve and store local playlist
    storeLocalPlaylists() {
        console.log('storeLocalPlaylists');
        this.playListsList$.subscribe((pll) => {
            console.log('current playlistslist', pll);
            const localPlaylists = new Array<Playlist>();
            pll.forEach(playlist => {
                if (playlist.isLocal) {
                    localPlaylists.push(playlist);
                }
            });
            this.Electron.ipcRenderer.send('save-local-playlists', localPlaylists);
        });
    }

    loadLocalPlaylist() {
        // Load local playlist
        this.Electron.ipcRenderer.send('send-get-local-playlists');
        this.Electron.ipcRenderer.on('get-local-playlists', (event, localPlaylist) => {

            if (localPlaylist) {
                const newPlaylistsList = new Array<Playlist>();
                this.playListsList$.subscribe((pll) => {
                    pll.forEach(playlist => {
                        newPlaylistsList.push(playlist);
                    });

                    localPlaylist.forEach(playlist => {
                        newPlaylistsList.push(playlist);
                    });


                    this.setPlayListsList(newPlaylistsList);
                });
            }
        });
    }

    // Fetch and load user playlist(s) and his video(s)
    // Into playlistslist Observable
    fetchYoutubePlaylist() {

        // Get all playlist
        this.playlistsService.getPlaylists()
        .flatMap((plList) => {

            this.setProgressBarValue(30);

            // Get all playlist items for each playlist
            const aRequest = [];
            plList['items'].forEach((playlist, i) => {
                const req = this.playlistItemsService.getPlaylistItems(playlist.id, '')
                // Recursive call for playlist items
                .expand((data: any) => this.playlistItemsService.getPlaylistItems(playlist.id, data.nextPageToken), 1)
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
                        const reqVideo = this.videosService.getVideosById(videoIds);
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

            this.setPlayListsList(playlistList);
            // this.playListsList.push(playlistList); ------------------------------------ <===

            // Set playlistlist
            this.playListsList$.subscribe((pll) => {
                pll.forEach((playlist: Playlist) => {
                    playlistList.push(playlist);
                });
            });
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
        do {
            aVideoId.push(videosIdList.slice(0, 50).join(','));
            videosIdList = videosIdList.slice(50);

        } while (videosIdList.length !== 0);
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

