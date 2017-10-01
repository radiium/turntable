import { Component, OnInit, Input, Output, OnDestroy,
    OnChanges, SimpleChanges,  ElementRef, ViewChild,  } from '@angular/core';

import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';

import { User } from '../../models/user.model';
import { Video } from '../../models/video.model';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../../_core/services/playlist.service';
import { PlayerService } from '../../../_core/services/player.service';
import { UtilsService } from '../../../_core/services/utils.service';
import { ElectronService } from 'ngx-electron';
import { AuthService } from '../../../_core/services/auth.service';
import { TabsService } from '../../../_core/services/tabs.service';

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
    public utils: UtilsService,
    public tabsService: TabsService,
    private _electron: ElectronService,
    private _authService: AuthService,
    private _playlistService: PlaylistService,
    private _playerService: PlayerService,
    private _dragulaService: DragulaService) {

        // Get user
        this._authService.user$
        .subscribe((user) => {
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
                that.videolist.forEach(video => {
                    if (el.dataset.id === video.id) {
                        accept = false;
                    }
                });
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

    changePlaylist() {
        this.activePlaylist = this.activePlaylist === 'Historic' ? 'Playlist' : 'Historic';
    }

    login() {
        if (this._electron.isElectronApp) {
            this._authService.login();
            this.tabsService.setSelectedTab(1);
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
