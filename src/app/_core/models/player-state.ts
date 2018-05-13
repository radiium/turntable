import { Video } from './video.model';
import { PlayerSide } from './player-side';

export interface PlayerState {
    side: PlayerSide;
    playerId: string;
    video: Video;
    isReady: boolean;
    state: YT.PlayerState;
    volume: number;
    speed: number;
}
