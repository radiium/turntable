import { Component, OnInit, Input, Output, OnDestroy,
    OnChanges, SimpleChanges,  ElementRef, ViewChild,  } from '@angular/core';

import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';

import { User, Video, Playlist } from '../../../_core/models';

import { PlaylistService } from '../../../_core/services/playlist.service';
import { PlayerStateService } from '../../../_core/services/player-state.service';
import { UtilsService } from '../../../_core/services/utils.service';
import { ElectronService } from 'ngx-electron';


import { AuthService } from '../../../_core/services/youtube';
import { DataService } from '../../../_core/services/data.service';


@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss'],
  viewProviders:  [DragulaService]
})
export class EditPlaylistComponent implements OnInit, OnDestroy, OnChanges {

    dragulaBagName = 'drag-drop-list';

    @ViewChild('autoscrollLeft')  autoscrollLeft: ElementRef;
    @ViewChild('autoscrollRight') autoscrollRight: ElementRef;

    @Input()
    playlist: Playlist;
    historic: Playlist;

    videolist: Array<Video>;

    @Input()
    type: string;

    originalPlaylist: Playlist;
    searchResultsList: Array<Video>;

    totalDuration: Number = 0;
    totalDurationHistoric: Number = 0;

    activePlaylist: String = 'Playlist';

    user: User;

    constructor(
    public  utils: UtilsService,
    private dataService: DataService,
    private electron: ElectronService,
    private authService: AuthService,
    private _playlistService: PlaylistService,
    private _playerStateService: PlayerStateService,
    private _dragulaService: DragulaService) {

        // Get user
        this.dataService.user$.subscribe((user) => {
            this.user = user;
        });

        // Get on play Historic playlist
        this._playlistService.setOnPlayHistoricPlayList(
            new Playlist(
                '', 'Historic', '', '', 0, 0, '', '', true,
                new Array<Video>()
            )
        );
        this._playlistService.onPlayHistoricPlaylist$
        .subscribe((historicPlaylist) => {
            this.historic = historicPlaylist;
            this.totalDurationHistoric = this.computeTotalDuration(this.historic.videolist);
        });

        // Get search result list
        this.dataService.searchResultPL$
        .subscribe((searchResuPL) => {
            this.searchResultsList = searchResuPL;

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

    ngOnInit() {
        // Init dragula service options
        const that = this;
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
                // Prevent duplicate
                let accept = true;
                if (source !== target) {
                    that.videolist.forEach(video => {
                        if (el.dataset.id === video.id) {
                            accept = false;
                        }
                    });
                }
                return (accept && target.dataset.acceptDrop === 'true');
            },
        });

        // Prevent animation on drag
        this._dragulaService.drag.subscribe((value) => {
            // value[1].children[0].children[0].children[0].children[1].style.marginLeft = 2;
            // console.log('value', value[1].children[0].children[0].children[0].children[1].style.marginLeft);
        });

        // Update playlist videolist model on drop
        this._dragulaService.dropModel.subscribe((args: any) => {
            const pl = this.utils.copyPlaylist(this.playlist, this.videolist);
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
        console.log('Yo dstroy');
        // Destroy dragula service
        if (!!this._dragulaService.find(this.dragulaBagName)) {
            this._dragulaService.destroy(this.dragulaBagName);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.playlist && changes.playlist.currentValue) {
            // Set videolist from input playlist
            this.videolist = changes.playlist.currentValue.videolist;

            // Update total duration on change
            this.totalDuration = this.computeTotalDuration(this.videolist);
        }

        if (changes && changes.playlist && !changes.playlist.currentValue) {
            this.playlist = new Playlist(
                '', 'Default', '', '', 0, 0, '', '', true,
                new Array<Video>()
            );
            this.videolist = this.playlist.videolist;
        }
    }

    //  Delete video
    deleteVideo(videoId) {
        if (videoId) {
            const pl = this.utils.copyPlaylist(this.playlist);
            pl.videolist = pl.videolist.filter(function(el) {
                return el.id !== videoId;
            });
            this.setPlaylist(pl);
        }
    }

    //  Delete video
    deleteVideoHistoric(videoId) {
        if (videoId) {
            const pl = this.utils.copyPlaylist(this.historic);
            pl.videolist = pl.videolist.filter(function(el) {
                return el.id !== videoId;
            });
            this._playlistService.setOnPlayHistoricPlayList(pl);
        }
    }

    addToPlaylist(video: Video) {
        const pl = this.utils.copyPlaylist(this.playlist);
        pl.videolist.push(video);
        this._playlistService.setOnPlayPlayList(pl);
    }

    // Play video
    playAtLeft(video) {
        if (this.type === 'player') {
            this._playerStateService.setPlayerLeft(video);
        }
    }

    playAtRight(video) {
        if (this.type === 'player') {
            this._playerStateService.setPlayerRight(video);
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

    changePlaylist() {
        this.activePlaylist = this.activePlaylist === 'Historic' ? 'Playlist' : 'Historic';
    }

    login() {
        if (this.electron.isElectronApp) {
            this.authService.login();
            this.dataService.setSelectedTab(0);
        }
    }

    computeTotalDuration(videolist: Array<Video>) {
        if (videolist) {
            let totalDuration = 0;
            videolist.forEach(el => {
                totalDuration += el.duration;
            });
            return totalDuration;
        }
        return 0;
    }

    isElectronApp() {
        return this.electron.isElectronApp;
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
