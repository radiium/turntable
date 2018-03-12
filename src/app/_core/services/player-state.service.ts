import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';

import { UtilsService } from 'core/services/utils.service';
import { DataService } from 'core/services/data.service';
import { YoutubePlayerService } from 'shared/modules/youtube-player/youtube-player.service';
import { Video, Playlist, Suggests,
    PlayerPanelState, PlayerState, PlayerSide } from 'core/models';


@Injectable()
export class PlayerStateService {


    // Player panel state
    private playerPLStateDefault: PlayerPanelState = {
        isFirstPlay: true,
        isRandom: false,
        isRepeat: false,
        playlist: new Array<Video>(),
        historiclist: new Array<Video>()
    };
    private playerPanelState  = new BehaviorSubject<PlayerPanelState>(this.playerPLStateDefault);
    public  playerPanelState$ = this.playerPanelState.asObservable();


    // Player left
    private playerStateDefaultLeft: PlayerState = {
        side: PlayerSide.LEFT,
        playerId: undefined,
        video: undefined,
        isReady: false,
        state: -1,
        volume: 100,
        speed: 1,
    };
    private playerStateLeft  = new BehaviorSubject<PlayerState>(this.playerStateDefaultLeft);
    public  playerStateLeft$ = this.playerStateLeft.asObservable();
    private playerLeft  = new Subject<YT.Player>();
    public  playerLeft$ = this.playerLeft.asObservable();
    private currentPlayerLeft: YT.Player;

    // Player right
    private playerStateDefaultRight: PlayerState = {
        side: PlayerSide.RIGHT,
        playerId: undefined,
        video: undefined,
        isReady: false,
        state: -1,
        volume: 100,
        speed: 1,
    };
    private playerStateRight  = new BehaviorSubject<PlayerState>(this.playerStateDefaultRight);
    public  playerStateRight$ = this.playerStateRight.asObservable();
    private playerRight  = new Subject<YT.Player>();
    public  playerRight$ = this.playerRight.asObservable();
    private currentPlayerRight: YT.Player;

    constructor(
    private YTPlayer: YoutubePlayerService,
    public utilsService: UtilsService,
    private dataService: DataService) {

        this.playerLeft.subscribe((data) => {
            this.currentPlayerLeft = data;
        });

        this.playerRight.subscribe((data) => {
            this.currentPlayerRight = data;
        });
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
    setPlayerLeft(player: YT.Player) {
        const state = this.playerStateLeft.getValue();
        state.isReady = true;
        this.setPlayerStateLeft(state);
        this.playerLeft.next(player);
    }
    setPlayerStateLeft(playerState: PlayerState) {
        this.playerStateLeft.next(_.cloneDeep(playerState));
    }
    setVolumeLeft(volume: number) {
        const state = this.playerStateLeft.getValue();
        state.volume = volume;
        this.setPlayerStateLeft(state);
        this.currentPlayerLeft.setVolume(volume);
    }
    setSpeedLeft(speed: number) {
        const state = this.playerStateRight.getValue();
        state.speed = speed;
        this.setPlayerStateRight(state);
        this.currentPlayerLeft.setPlaybackRate(speed);
    }


    // Player right
    setPlayerRight(player: YT.Player) {
        const state = this.playerStateRight.getValue();
        state.isReady = true;
        this.setPlayerStateRight(state);
        this.playerRight.next(player);
    }
    setPlayerStateRight(playerState: PlayerState) {
        this.playerStateRight.next(_.cloneDeep(playerState));
    }
    setVolumeRight(volume: number) {
        const state = this.playerStateRight.getValue();
        state.volume = volume;
        this.setPlayerStateRight(state);
        this.currentPlayerRight.setVolume(volume);
    }
    setSpeedRight(speed: number) {
        const state = this.playerStateRight.getValue();
        state.speed = speed;
        this.setPlayerStateRight(state);
        this.currentPlayerRight.setPlaybackRate(speed);
    }


    // Get player instance by id
    getPlayerById(playerId: string) {
        if (playerId && window['YT']) {
            return window['YT'].get(playerId);
        }
        return false
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

        debugger
        const playerLeft = this.getPlayerById(playerStateLeft.playerId);

        if (playerLeft && playerStateLeft) {
            playerLeft.cueVideoById(video.id);
            playerLeft.playVideo();

            console.log('PLAYER => ', playerLeft)
            console.log('DURATION => ', playerLeft.getDuration())



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
