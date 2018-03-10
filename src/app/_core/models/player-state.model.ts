import { Video } from './video.model';

export interface PlayerState {
    player: YT.Player;
    video: Video;
    isReady: boolean;
    state: number;
    volume: number;
    speed: number;
}