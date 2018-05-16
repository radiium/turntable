import { PlaylistItem, PlayerSide } from './';

export interface PlayerState {
    side: PlayerSide;
    playerId: string;
    video: PlaylistItem;
    isReady: boolean;
    state: YT.PlayerState;
    volume: number;
    speed: number;
}
