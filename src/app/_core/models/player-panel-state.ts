
import { PlaylistItem } from './';

export interface PlayerPanelState {
    isFirstPlay: boolean;
    isRandom: boolean;
    isRepeat: boolean;
    playlist: Array<PlaylistItem>;
    historiclist: Array<PlaylistItem>;
}
