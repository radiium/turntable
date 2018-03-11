
import { Video } from './video.model';

export interface PlayerPanelState {
    isFirstPlay: boolean;
    isRandom: boolean;
    isRepeat: boolean;
    playlist: Array<Video>;
    historiclist: Array<Video>;
}