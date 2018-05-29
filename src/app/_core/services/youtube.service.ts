import { Injectable } from '@angular/core';
import { Observable,
         Subject,
         forkJoin,
         of,
         empty } from 'rxjs';
import { mergeMap,
         expand,
         pluck,
         scan,
         last,
         map,
         flatMap,
         catchError } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import * as _ from 'lodash';


import { User,
         PlaylistItem,
         Suggests,
         Playlist,
         SearchResults, 
         PlaylistFactory,
         PlayListType,
         PrivacyStatus,
         Thumbnail,
         PlaylistItemFactory} from 'core/models';
import { VideosApiService,
         ChannelsApiService,
         SubscriptionsApiService,
         PlaylistsApiService,
         PlaylistItemsApiService,
         SearchApiService,
         SuggestApiService,
         UserInfosApiService } from 'core/services/api';
import { DataService } from 'core/services/data.service';

@Injectable()
export class YoutubeService {

    user: User;
    playlistList: Playlist[];
    searchResults: SearchResults = {
        query: '',
        results: new Array(),
        prevPageToken: '',
        nextPageToken: ''
    };

    isElectronApp: boolean;

    constructor(
    private electron: ElectronService,
    private playlistsService: PlaylistsApiService,
    private playlistItemsService: PlaylistItemsApiService,
    private channelsApiService: ChannelsApiService,
    private subsApiService: SubscriptionsApiService,
    private dataSrv: DataService,
    private searchService: SearchApiService,
    private videosService: VideosApiService,
    private suggestService: SuggestApiService
    ) {

        this.playlistList = [];
        this.dataSrv.playlistsList$.subscribe((data) => {
            this.playlistList = data;
        });

        this.dataSrv.searchResults$.subscribe((data) => {
            this.searchResults = data;
        });

        this.dataSrv.user$.subscribe((data) => {
            this.user = data;
        });
    }


    // ------------------------------------------------------------------------
    // Search suggestions by query string
    searchSuggestsVideo(query: string) {
        return this.suggestService.searchSuggestsVideo(query);
    }


    // ------------------------------------------------------------------------
    // Search videos by query string
    searchVideos(query: string, pageToken?: string) {

        this.dataSrv.setLoaderPanel(!pageToken ? true : false);

        this.searchService.searchVideos(query, pageToken)
        .pipe(
            mergeMap((searchResult) => {
                this.searchResults.prevPageToken = searchResult['prevPageToken'];
                this.searchResults.nextPageToken = searchResult['nextPageToken'];

                const idList = searchResult['items'].map(item => item.id.videoId);
                return this.videosService.getVideosById(idList.join(','));
            })
        )
        .subscribe((videoResults) => {
            const videoList = videoResults['items'].map(item => this.parseVideo(item));

            if (this.searchResults.query !== query) {
                this.searchResults.query = query;
                this.searchResults.results = [];
            }

            this.searchResults.results.push(videoList);
            this.dataSrv.setSearchResults(this.searchResults);
            this.dataSrv.setLoaderPanel(false);
        });
    }


    // Fetch and load user playlist(s) and his video(s)
    // Into playlistslist Observable
    fetchYoutubePlaylists() {

        this.dataSrv.setLoaderPanel(true);

        this.playlistsService.getPlaylists().subscribe(
            (data) => {
                const aReq = this.getPlaylistItemsRequest(data);
                forkJoin(aReq).subscribe(
                    (playlistList) => {
                        playlistList.forEach((playlist: Playlist) => {
                            this.playlistList.push(playlist);
                        });
                        this.playlistList = _.uniqBy(this.playlistList, 'id');
                        this.dataSrv.setPlaylistsList(this.playlistList);
                    },
                    (err) => console.log('Something went wrong:', err),
                    () => {
                        this.dataSrv.setLoaderPanel(false);
                        // this.fetchYoutubeSubscriptions();
                    }
                );
            },
            (err) => console.log('Something went wrong:', err),
            () => {}
        );
    }

    getPlaylistItemsRequest(playlistList) {
        // Get all playlist items for each playlist
        const aRequest = [];
        playlistList['items'].forEach((playlist, i) => {
            const items = [];
            const req = this.playlistItemsService.getPlaylistItems(playlist.id, '').pipe(

                // Recursive call for playlist items
                expand((data: any) => this.playlistItemsService.getPlaylistItems(playlist.id, data.nextPageToken), 1),

                // Group each response by 'items' field
                pluck('items'),

                // Concat each items in array
                scan((array: any, data) => {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            array.push(data[key]);
                        }
                    }
                    return array;
                }, []),

                last(),

                flatMap((plItemsList) => {

                    // Parse videos id
                    const videoIdList = this.parseVideoId(plItemsList);
                    const aReq = [];

                    // Get videos metadatas
                    videoIdList.forEach((videoIds) => {
                        const reqVideo = this.videosService.getVideosById(videoIds);
                        aReq.push(reqVideo);
                    });

                    return forkJoin(aReq).pipe(
                        // Parse videos metadatas in video object
                        map((res) => {
                            const videoList = [];
                            res.forEach((el: any, index) => {
                                el.items.forEach(video => {
                                    if (video.status.embeddable) {
                                        const objVideo = this.parseVideo(video);
                                        videoList.push(objVideo);
                                    }
                                });
                            });

                            // Create playlist object
                            return this.parsePlaylist(playlist, videoList);
                        })
                    );
                })
            );

            aRequest.push(req);
        });

        return aRequest;
    }

    fetchYoutubeSubscriptions() {
        this.channelsApiService.getMyChannelId(this.user.name).subscribe(data => {
            console.log('getMyChannelId', data);
        });

        this.subsApiService.getMySubscriptions().subscribe(data => {
            console.log('getMySubscriptions', data);
        });
    }



    // UTILS


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
    parsePlaylist(playlist: any, videolist?: PlaylistItem[]) {

        const thumb: Thumbnail = {
            url: playlist.snippet.thumbnails.medium.url,
            height: playlist.snippet.thumbnails.medium.height,
            width: playlist.snippet.thumbnails.medium.width,
        };

        return PlaylistFactory.create(PlayListType.PLAYLIST, {
            id: playlist.id,
            appId: UUID.UUID(),
            title: playlist.snippet.localized.title,
            description: playlist.snippet.localized.description,
            thumb: thumb,
            publishedAt: playlist.snippet.publishedAt,
            privacyStatus: PrivacyStatus.PRIVATE,
            isLocal: false,
            videolist: videolist
        });
    }

    // Parse and convert video object from YouTube api to app video object
    parseVideo(video: any) {

        const thumb: Thumbnail = {
            url: video.snippet.thumbnails.default.url,
        };

        return PlaylistItemFactory.create({
            id: video.id,
            appId: UUID.UUID(),
            title: _.deburr(video.snippet.localized.title),
            description: _.deburr(video.snippet.localized.description),
            thumb: thumb,
            duration: moment.duration(video.contentDetails.duration).asMilliseconds(),
            channelTitle: video.snippet.channelTitle,
            publishedAt: video.snippet.publishedAt,
            selected: false
        });
    }
}
