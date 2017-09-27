import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Video } from '../../models/video.model';
import { PlayerService } from '../../../_core/services/player.service';



@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnDestroy {

    resultsList: Video[] = [];
    playList:    Video[] = [];
    historic:    Video[] = [];
    totalDuration: Number = 0;
    displayDrop: Boolean = true;

    isPlaylist: Boolean = true;

    getPlaylist() {
        this.isPlaylist = true;
    }
    getHistoric() {
        this.isPlaylist = false;
    }

    // Constructor
    constructor(
        private _playerService: PlayerService,
        private dragulaService:    DragulaService) {

        // Get results search list
        _playerService.resultsList$.subscribe((res) => {
            this.resultsList = res;
        });

        // Get historic list list
        _playerService.historicList$.subscribe((res) => {
            this.historic = res;
        });

        // Set Dragula otions
        dragulaService.setOptions('bag-items', {
            removeOnSpill: true,
            revertOnSpill: true,
            moves: (el: Element, source: Element, handle: Element, sibling: Element): boolean => {
                if (el.id === 'dropInfos') {
                    return false;
                }
                return true;
            },
            copy: (el: Element, source: Element): boolean => {
                if (source.id === 'rl') { return true; }
                return false;
            },
            accepts: (el: Element, target: Element, source: Element, sibling: Element): boolean => {
                const sameContainer = (source === target);
                if (target.id === 'pl' && !sameContainer) {
                    for (let i = 0; i < this.playList.length; i++) {
                        if (el.id === this.playList[i].id) {
                            return false;
                        }
                    }
                }
                if (target.id === 'rl') { return false; }
                return true;
            },
        });

        // Update playlist after event after drop, end or remove
        dragulaService.dragend.subscribe((el) => {
            this.updatePlayList();
            this.displayDrop = true;
        });
        dragulaService.over.subscribe((el, container, source) => {
            this.displayDrop = false;
        });
    }

    // On destroy component
    ngOnDestroy(): void {
        if (!!this.dragulaService.find('bag-items')) {
            this.dragulaService.destroy('bag-items');
        }
    }

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
                return el.id !== v.id;
            });
        }
        this.updatePlayList();
    }

    removeItemHistoric(v: Video) {
        if (v) {
            this.historic = this.historic.filter(function(el) {
                return el.id !== v.id;
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

    playLeft(v: Video) {
        this._playerService.setPlayerLeft(v);
        this.historic.push(v);
        this._playerService.setHistoricList(this.historic);
        this.removeItem(v);
    }
    playRight(v: Video) {
        this._playerService.setPlayerRight(v);
        this.historic.push(v);
        this._playerService.setHistoricList(this.historic);
        this.removeItem(v);
    }
}
