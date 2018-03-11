import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';

import { UtilsService } from 'core/services/utils.service';
import { DataService } from 'core/services/data.service';
import { YoutubePlayerService } from 'shared/modules/youtube-player/youtube-player.service';
import { Video, Playlist, Suggests,
    PlayerPanelState, PlayerState } from 'core/models';


@Injectable()
export class PlayerStateService {



    // Default config
    private playerPLStateDefault: PlayerPanelState = {
        isFirstPlay: true,
        isRandom: false,
        isRepeat: false,
        playlist: new Array<Video>(),
        historiclist: new Array<Video>()
    };

    private playerStateDefault: PlayerState = {
        player: null,
        video: null,
        isReady: false,
        state: -1,
        volume: 100,
        speed: 1,
    };

    // Player panel state
    private playerPanelState  = new BehaviorSubject<PlayerPanelState>(this.playerPLStateDefault);
    public  playerPanelState$ = this.playerPanelState.asObservable();

    // Player left
    private playerStateLeft  = new BehaviorSubject<any>(this.playerStateDefault);
    public  playerStateLeft$ = this.playerStateLeft.asObservable();

    // Player right
    private playerStateRight  = new BehaviorSubject<any>(this.playerStateDefault);
    public  playerStateRight$ = this.playerStateRight.asObservable();


    constructor(
    private YTPlayer: YoutubePlayerService,
    public utilsService: UtilsService,
    private dataService: DataService) {
    }


    // Setters
    setPlayerPanelState(data: PlayerPanelState) {
        this.playerPanelState.next(data);
    }

    setPlaylist(videoList: Array<Video>) {
        this.playerPanelState.getValue().playlist = _.cloneDeep(videoList);
        this.setPlayerPanelState(this.playerPanelState.getValue());
    }

    addToPlaylist(data: any) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        this.playerPanelState.getValue().playlist.push(..._.cloneDeep(data));
        this.setPlayerPanelState(this.playerPanelState.getValue());
    }

    setHistoriclist(data: Array<Video>) {
        this.playerPanelState.getValue().historiclist = _.cloneDeep(data);
        this.setPlayerPanelState(this.playerPanelState.getValue());
    }


    // Player left
    setPlayerStateLeft(player: PlayerState) {
        this.playerStateLeft.next(_.cloneDeep(player));
    }

    // Player right
    setPlayerStateRight(player: PlayerState) {
        this.playerStateRight.next(_.cloneDeep(player));
    }



    // Play from a choosen video
    playVideo(video: Video) {
        const panelState = this.playerPanelState.getValue();

        let playlist = panelState.playlist;
        const historiclist = panelState.historiclist;
        let videoToPlay = null;

        // Play from achoosen video
        videoToPlay = _.find(playlist, { id: video.id });
        if (videoToPlay) {
            playlist = _.remove(playlist, { id: videoToPlay.id });
        }
        historiclist.unshift(video);

        // Update player panel playlist
        panelState.playlist     = playlist;
        panelState.historiclist = historiclist;
        this.setPlayerPanelState(panelState);

        this.playOnPlayer(video);
    }


    playVideoAuto() {
        const panelState = this.playerPanelState.getValue();

        const playlist = panelState.playlist;
        const historiclist = panelState.historiclist;
        const isRandom = panelState.isRandom;
        const isRepeat = panelState.isRepeat;

        let videoToPlay = null;

        if (isRandom && !isRepeat) {
            videoToPlay = playlist[Math.floor(Math.random() * playlist.length)];
            _.remove(playlist, { id: videoToPlay.id });
            historiclist.unshift(videoToPlay);

        } else if (isRandom && isRepeat || !isRandom && isRepeat) {
            videoToPlay = historiclist[0];

        } else if (!isRandom && !isRepeat) {
            videoToPlay = playlist[0];
            _.remove(playlist, { id: videoToPlay.id });
            historiclist.unshift(videoToPlay);
        }

        // Update player panel playlist
        panelState.playlist     = playlist;
        panelState.historiclist = historiclist;
        this.setPlayerPanelState(panelState);

        this.playOnPlayer(videoToPlay);
    }


    playOnPlayer(video: Video) {
        const panelState = this.playerPanelState.getValue();

        const playerStateLeft  = this.playerStateLeft.getValue();
        const playerStateright = this.playerStateLeft.getValue();

        const isFirstPlay = panelState.isFirstPlay;

        console.log('playerStateLeft', playerStateLeft);
        console.log('playerStateright', playerStateright);

        if (playerStateLeft) {
            playerStateLeft.player.cueVideoById(video.id);
            playerStateLeft.player.playVideo();

            console.log('PLAYER => ', playerStateLeft.player)
            console.log('DURATION => ', playerStateLeft.player.getDuration())



            playerStateLeft.video = video;
            this.setPlayerStateLeft(playerStateLeft);
        }
        /*
        // First play
        if (isFirstPlay && !isLeftOnPlay && !isRightOnPlay) {


        // All player stopped
        } else if (!isFirstPlay && !isLeftOnPlay && !isRightOnPlay) {


        // Player left on play
        } else if (!isFirstPlay && isLeftOnPlay && !isRightOnPlay) {


        // Player right on play
        } else if (!isFirstPlay && !isLeftOnPlay && isRightOnPlay) {

        }
        */
    }

    getDuration(player: YT.Player) {
        return player.getDuration();
    }

    getVideoData(player: YT.Player) {
        // return player.getVideoData();
    }

}
