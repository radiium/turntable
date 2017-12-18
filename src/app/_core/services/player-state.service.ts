import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UtilsService } from './utils.service';
import { DataService } from './data.service';

import { Video, Playlist, Suggests } from '../models';

@Injectable()
export class PlayerStateService {

    // --------------------------------------------------------

    // Active player
    private activePlayer: String = null; // = new Subject<Video>();
    isFirstPlay: Boolean = true;

    // Random video
    isRandom =  new Subject<boolean>();
    isRandom$ = this.isRandom.asObservable();

    // --------------------------------------------------------

    // Player video left
    private playerLeft = new Subject<Video>();
    playerLeft$  = this.playerLeft.asObservable();

    volumeLeft = new Subject<number>();
    volumeLeft$ = this.volumeLeft.asObservable();

    speedLeft = new Subject<number>();
    speedLeft$ = this.speedLeft.asObservable();

    // --------------------------------------------------------

    // Player video right
    private playerRight = new Subject<Video>();
    playerRight$ = this.playerRight.asObservable();

    volumeRight = new Subject<number>();
    volumeRight$ = this.volumeRight.asObservable();

    speedRight = new Subject<number>();
    speedRight$ = this.speedRight.asObservable();

    // --------------------------------------------------------

    // Playlist on play
    onPlayHistoricPlaylist: Playlist;
    onPlayPlaylist: Playlist;

    // --------------------------------------------------------

    constructor(
    public utilsService: UtilsService,
    private dataService: DataService
    ) {
        this.dataService.onPlayHistoricPlaylist$
        .subscribe((pl) => {
            this.onPlayHistoricPlaylist = pl;
        });

        this.dataService.onPlayPlaylist$
        .subscribe((pl) => {
            this.onPlayPlaylist = pl;
        });
    }

    // --------------------------------------------------------
    // Setters

    setActivePlayer(side) { this.activePlayer = side; }
    getActivePlayer() { return this.activePlayer; }

    setIsRandom(isRandom) { this.isRandom.next(isRandom); }

    setPlayerLeft(vl) {
        this.playerLeft.next(vl);
        this.updatePlaylists(vl);
    }
    setPlayerRight(vr) {
        this.playerRight.next(vr);
        this.updatePlaylists(vr);
    }

    setVolumeLeft(volLeft)   { this.volumeLeft.next(volLeft); }
    setVolumeRight(volRight) { this.volumeRight.next(volRight); }

    setSpeedLeft(speedLeft)   { this.speedLeft.next(speedLeft); }
    setSpeedRight(speedRight) { this.speedRight.next(speedRight); }



    // Update on play playlist and on play historic
    updatePlaylists(video: Video) {

        // Add video to on play historic playlist
        const hpl = this.utilsService.copyPlaylist(this.onPlayHistoricPlaylist);
        hpl.videolist.push(video);
        this.dataService.setOnPlayHistoricPlayList(hpl);

        // Remove video from on play playlist
        const ppl = this.utilsService.copyPlaylist(this.onPlayPlaylist);
        let videolist = ppl.videolist;
        videolist = videolist.filter(function(el) {
            return el.id !== video.id;
        });
        ppl.videolist = videolist;
        this.dataService.setOnPlayPlayList(ppl);
    }
}
