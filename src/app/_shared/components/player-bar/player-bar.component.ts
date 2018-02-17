import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-player-bar',
    templateUrl: './player-bar.component.html',
    styleUrls: ['./player-bar.component.scss']
})
export class PlayerBarComponent implements OnInit {

    isOnplay: boolean;
    isRandom: boolean;
    isRepeat: boolean;

    constructor() {
        this.isOnplay = true;
        this.isRandom = false;
        this.isRepeat = false;
    }

    ngOnInit() {
    }


    onPrev() {

    }

    onNext() {

    }

    onPlayPause() {
        this.isOnplay = !this.isOnplay;
    }

    onRandom() {
        this.isRandom = !this.isRandom;
    }
    onRepeat() {
        this.isRepeat = !this.isRepeat;
    }

    hasPrev() {
        return false;
    }

    hasNext() {
        return true;
    }
}
