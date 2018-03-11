import { Video } from './video.model';
import { PlayerSide } from './player-side';

export interface PlayerState {
    side: PlayerSide;
    player: YT.Player;
    playerId: string;
    video: Video;
    isReady: boolean;
    state: number;
    volume: number;
    speed: number;
}