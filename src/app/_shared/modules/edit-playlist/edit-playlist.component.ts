import { Component, OnInit, Input, OnChanges, SimpleChanges,
    ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';

import { Video } from '../../models/video.model';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../../_core/services/playlist.service';
import { PlayerService } from '../../../_core/services/player.service';
import { CopyService } from '../../../_core/services/copy.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css'],
  viewProviders:  [DragulaService]
})
export class EditPlaylistComponent implements OnInit, OnDestroy, OnChanges {

    dragulaBagName = 'drag-drop-list';

    @ViewChild('autoscrollLeft')  autoscrollLeft: ElementRef;
    @ViewChild('autoscrollRight') autoscrollRight: ElementRef;

    @Input()
    playlist: Playlist;
    videolist: Array<Video>;

    @Input()
    type: string;

    originalPlaylist: Playlist;
    searchResultsList: Array<Video>;

    constructor(
    public copy: CopyService,
    private _playlistService: PlaylistService,
    private _playerService: PlayerService,
    private _dragulaService: DragulaService) {

        // Get search result list
        this._playlistService.searchResultPlaylist$
        .subscribe((searchResultsList) => {
            this.searchResultsList = searchResultsList;

            // Set autoscroll on drag
            // at begin or end of playlist container
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

    ngOnChanges(changes: SimpleChanges) {
        // Set videolist when 
        if (changes && changes.playlist && changes.playlist.currentValue) {
            this.videolist = changes.playlist.currentValue.videolist;
        }

    }

    ngOnInit() {
        // Init dragula service options
        this._dragulaService.setOptions(
            this.dragulaBagName, {
            revertOnSpill: true,
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true';
            },
            copy: (el, source): boolean => {
                return source.dataset.acceptDrop === 'false';
            },
            accepts: (el, target, source, sibling): boolean => {
                return target.dataset.acceptDrop === 'true';
            },
        });

        // Prevent animation on drag
        this._dragulaService.drag.subscribe((value) => {
            // value[1].children[0].children[0].children[0].children[1].style.marginLeft = 2;
            // console.log('value', value[1].children[0].children[0].children[0].children[1].style.marginLeft);
        });

        // Update playlist videolist model on drop
        this._dragulaService.dropModel.subscribe((args: any) => {
            const pl = this.copy.copyPlaylist(this.playlist, this.videolist);
            this.setPlaylist(pl);
        });
        /*
        this.dragulaService.dragend.subscribe((el) => {
        });
        this.dragulaService.over.subscribe((val) => {
        });
        */
    }

    ngOnDestroy() {
        // Destroy dragula service
        if (!!this._dragulaService.find(this.dragulaBagName)) {
            this._dragulaService.destroy(this.dragulaBagName);
        }
    }

    //  Delete video
    deleteVideo(videoId) {
        if (videoId) {
            const pl = this.copy.copyPlaylist(this.playlist);
            pl.videolist = pl.videolist.filter(function(el) {
                return el.id !== videoId;
            });
            this.setPlaylist(pl);
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

    setPlaylist(playlist) {
        if (playlist) {
            if (this.type === 'player') {
                this._playlistService.setOnPlayPlayList(playlist);
            } else if (this.type === 'edit') {
                this._playlistService.setOnEditPlayList(playlist);
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
