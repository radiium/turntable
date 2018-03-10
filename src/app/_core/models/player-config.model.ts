import { Video } from './video.model';

export interface PlayerConfig {
    video: Video;
    volume: number;
    speed: number;
    height: number;
    width: number;
}