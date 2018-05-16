import { PlaylistItem } from './playlist-item.model';
import { PlayerSide } from './player-side';

export interface PlayerState {
    side: PlayerSide;
    playerId: string;
    video: PlaylistItem;
    isReady: boolean;
    state: YT.PlayerState;
    volume: number;
    speed: number;
}
