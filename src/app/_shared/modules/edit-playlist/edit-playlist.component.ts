import { Component, OnInit, Input, OnChanges, AfterViewInit,
    SimpleChanges, ElementRef, ViewChild } from '@angular/core';

import * as autoScroll from 'dom-autoscroller';


import { Video } from '../../models/video.model';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../../_core/services/playlist.service';
import { PlayerService } from '../../../_core/services/player.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit, AfterViewInit, OnChanges {


    @ViewChild('autoscrollLeft')  autoscrollLeft: ElementRef;
    @ViewChild('autoscrollRight') autoscrollRight: ElementRef;

    @Input()
    playlist: Playlist;

    @Input()
    type: string;

    originalPlaylist: Playlist;
    searchResultsList: Array<Video>;

    constructor(
    private _playlistService: PlaylistService,
    private _playerService: PlayerService) {

        // Get search result list
        this._playlistService.searchResultPlaylist$
        .subscribe((searchResultsList) => {
            this.searchResultsList = searchResultsList;

            //
            const scroll = autoScroll([
                this.autoscrollLeft.nativeElement,
                this.autoscrollRight.nativeElement,
            ], {
                margin: 70,
                maxSpeed: 6,
                scrollWhenOutside: true,
                autoScroll: () => scroll.down
            });
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }


    //  Delete video
    deleteVideo(videoId) {
        if (videoId) {
            this.playlist.videolist = this.playlist.videolist.filter(function(el) {
                return el.id !== videoId;
            });
            if (this.type === 'player') {
                this._playlistService.setOnPlayPlayList(this.playlist);
            } else if (this.type === 'edit') {
                this._playlistService.setOnEditPlayList(this.playlist);
            }
        }
    }

    // Play video
    playVideo(video, side) {
        if (this.type === 'player') {
            if (side === 'left') {
                this._playerService.setPlayerLeft(video);
            }
            if (side === 'right') {
                this._playerService.setPlayerRight(video);
            }
        }
    }

    /*
    // Update playlist in _playerService
    updatePlayList() {
        this._playerService.setCurrentPlayList(this.playList);
        this.totalDuration = 0;
        this.playList.forEach(el => {
            this.totalDuration += el.duration;
        });
    }

    // Update playlist in _playerService
    updateHistoric() {
        this._playerService.setHistoricList(this.historic);
        this.historic.forEach(el => {
            this.totalDuration += el.duration;
        });
    }

    // Add item to playList
    addItem(v: Video) {
        if (this.playList.indexOf(v) === -1 && this.exist(v, this.playList)) {
            this.playList.push(v);
        }
        this.updatePlayList();
    }

    // Remove item in playList
    removeItem(v: Video) {
        if (v) {
            this.playList = this.playList.filter(function(el) {
                return el.videoId !== v.videoId;
            });
        }
        this.updatePlayList();
    }

    removeItemHistoric(v: Video) {
        if (v) {
            this.historic = this.historic.filter(function(el) {
                return el.videoId !== v.videoId;
            });
        }
        this.updateHistoric();
    }

    // Remove duplicate item in an array
    unique(a) {
        a.sort();
        for (let i = 1; i < a.length; ) {
            if (a[i - 1] === a[i]) {
                a.splice(i, 1);
            } else {
                i++;
            }
        }
        return a;
    }

    // Check if item exist in array
    exist(video, videosList) {
        for (let i = 0; i < videosList.length; i++) {
            if (video.videoId === videosList[i].videoId) {
                return false;
            }
        }
        return true;
    }
    */
}
