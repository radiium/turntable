import { Injectable, Input } from '@angular/core';
import { Observable,
         Subject,
         BehaviorSubject,
         Subscription,
         timer } from 'rxjs';
import * as _ from 'lodash';


import { DataService } from 'core/services/data.service';
import { YoutubePlayerService } from 'shared/modules/youtube-player/youtube-player.service';
import { PlaylistItem, Playlist, Suggests,
    PlayerPanelState, PlayerState,
    PlayerSide, AppState} from 'core/models';

@Injectable()
export class PlayerStateService {

    appState: AppState;
    onPlayList: PlaylistItem[];
    historicList: PlaylistItem[];

    // Player panel state
    private playerPLStateDefault: PlayerPanelState = {
        isFirstPlay: true,
        isRandom: false,
        isRepeat: false,
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
    private dataSrv: DataService) {

        this.dataSrv.appState$.subscribe(data => this.appState = data);
        this.dataSrv.onPlayList$.subscribe(data => this.onPlayList = data);
        this.dataSrv.historicList$.subscribe(data => this.historicList = data);
        this.playerLeft.subscribe(data => this.currentPlayerLeft = data);
        this.playerRight.subscribe(data => this.currentPlayerRight = data);
    }

    // Setters
    setPlayerPanelState(data: PlayerPanelState) {
        this.playerPanelState.next(data);
    }

    setRandom(isRandom: boolean) {
        this.playerPanelState.getValue().isRandom = isRandom;
        this.setPlayerPanelState(this.playerPanelState.getValue());
    }

    setRepeat(isRepeat: boolean) {
        this.playerPanelState.getValue().isRepeat = isRepeat;
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
    setStateLeft(state: YT.PlayerState) {
        const playerState = this.playerStateLeft.getValue();
        playerState.state = state;
        this.setPlayerStateLeft(playerState);
    }
    setVolumeLeft(volume: number) {
        const playerState = this.playerStateLeft.getValue();
        playerState.volume = volume;
        this.setPlayerStateLeft(playerState);
        this.currentPlayerLeft.setVolume(volume);
    }
    getVolumeLeft() {
        const playerState = this.playerStateLeft.getValue();
        return playerState.volume;
    }
    setSpeedLeft(speed: number) {
        const playerState = this.playerStateLeft.getValue();
        playerState.speed = speed;
        this.setPlayerStateLeft(playerState);
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
    setStateRight(state: YT.PlayerState) {
        const playerState = this.playerStateRight.getValue();
        playerState.state = state;
        this.setPlayerStateRight(playerState);
    }
    setVolumeRight(volume: number) {
        const playerState = this.playerStateRight.getValue();
        playerState.volume = volume;
        this.setPlayerStateRight(playerState);
        this.currentPlayerRight.setVolume(volume);
    }
    getVolumeRight() {
        const playerState = this.playerStateRight.getValue();
        return playerState.volume;
    }
    setSpeedRight(speed: number) {
        const playerState = this.playerStateRight.getValue();
        playerState.speed = speed;
        this.setPlayerStateRight(playerState);
        this.currentPlayerRight.setPlaybackRate(speed);
    }


    // Get player instance by id
    getPlayerById(playerId: string) {
        if (playerId && window['YT']) {
            return window['YT'].get(playerId);
        }
        return false;
    }

    playVideo(video: PlaylistItem, index?: number) {
        let videoToPlay;
        if (index !== undefined) {
            videoToPlay = this.onPlayList[index];
            this.onPlayList.splice(index, 1);
        } else {
            videoToPlay = video;
        }

        this.historicList.unshift(videoToPlay);
        this.dataSrv.setHistoricList(this.historicList);

        // this.setPlayerPanelState(panelState);
        this.playOnPlayer(videoToPlay);
    }


    playVideoAuto(side) {

        const panelState = this.playerPanelState.getValue();

        const playlist = this.onPlayList;
        const historiclist = this.historicList;
        const isRandom = panelState.isRandom;
        const isRepeat = panelState.isRepeat;

        if (playlist.length > 0) {

            // Get video to play
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

            this.dataSrv.setOnPlayList(playlist);
            this.dataSrv.setHistoricList(historiclist);

            // Play video on the oposite player
            if (side === PlayerSide.LEFT) {
                this.playOnPlayer(videoToPlay, PlayerSide.RIGHT);
            } else if (side === PlayerSide.RIGHT) {
                this.playOnPlayer(videoToPlay, PlayerSide.LEFT);
            }
        } else {
            console.log('...Playlist empty');
        }
    }

    playOnPlayer(video: PlaylistItem, side?: PlayerSide) {
        const panelState = this.playerPanelState.getValue();
        const isFirstPlay = panelState.isFirstPlay;

        const playerStateLeft  = this.playerStateLeft.getValue();
        const playerStateRight = this.playerStateRight.getValue();
        const playerLeft  = this.getPlayerById(playerStateLeft.playerId);
        const playerRight = this.getPlayerById(playerStateRight.playerId);

        if (playerLeft  && playerStateLeft
        &&  playerRight && playerStateRight) {

            // Auto play
            if (side) {

                if (side === PlayerSide.RIGHT) {
                    console.log('AutoPlay at right');
                    playerStateRight.video = video;
                    this.setPlayerStateRight(playerStateRight);

                    playerRight.cueVideoById(video.id);
                    playerRight.playVideo();

                    this.timerPlayer(playerLeft, PlayerSide.LEFT);

                } else if (side === PlayerSide.LEFT) {
                    console.log('AutoPlay at left');
                    playerStateLeft.video = video;
                    this.setPlayerStateLeft(playerStateLeft);

                    playerLeft.cueVideoById(video.id);
                    playerLeft.playVideo();

                    this.timerPlayer(playerRight, PlayerSide.RIGHT);
                }

            // Force play
            } else {
                // playerStateLeft.state !== 1 &&
                if (playerStateRight.state === 1) {
                    playerRight.cueVideoById(video.id);
                    playerRight.playVideo();
                    playerStateRight.video = video;
                    this.setPlayerStateLeft(playerStateRight);
                } else {
                    playerLeft.cueVideoById(video.id);
                    playerLeft.playVideo();
                    playerStateLeft.video = video;
                    this.setPlayerStateLeft(playerStateLeft);
                }
            }
        }
    }

    timerPlayer(player, side: PlayerSide) {

        let count = 0;
        const timer$ = timer(0, 250);

        const sub = timer$.subscribe((t) => {
            count++;

            if (side === PlayerSide.LEFT) {
                this.setVolumeLeft(this.getVolumeLeft() - 0.5);

            } else if (side === PlayerSide.RIGHT) {
                this.setVolumeRight(this.getVolumeRight() - 0.5);
            }

            if (count === 56) {
                console.log('=> VIDEO "' + side + '" ENDED');
                player.stopVideo();
                this.setVolumeLeft(100);
                this.setVolumeRight(100);
                sub.unsubscribe();
            }
        });
    }
}
