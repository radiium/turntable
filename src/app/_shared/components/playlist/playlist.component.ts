import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { dragula } from 'ng2-dragula/ng2-dragula';

import { Video } from '../../models/video.model';
import { VideoStateService } from '../../../_core/services/video-state.service';

import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../../_core/services/playlist.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    videolistValue;

    @Output()
    videolistChange = new EventEmitter();

    @Input()
    get videolist() {
        return this.videolistValue;
    }

    set videolist(val) {
        this.videolistValue = val;
        this.videolistChange.emit(this.videolistValue);
    }

    @Input()
    acceptDrop: Boolean;

    constructor(private playlistService: PlaylistService) {
    }
    ngOnInit(): void {
    }

    deleteVideo(videoId) {
        if (videoId) {
            this.videolist = this.videolist.filter(function(el) {
                return el.id !== videoId;
            });
            this.playlistService.setOnEditPlayList(this.videolist);
        }
    }

    /*
    // Update playlist in VideoStateService
    updatePlayList() {
        this.VideoStateService.setCurrentPlayList(this.playList);
        this.totalDuration = 0;
        this.playList.forEach(el => {
            this.totalDuration += el.duration;
        });
    }

    // Update playlist in VideoStateService
    updateHistoric() {
        this.VideoStateService.setHistoricList(this.historic);
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
