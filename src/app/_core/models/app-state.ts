import { PlaylistItem, User } from 'core/models';

export class AppState {
    constructor(
    public langage?: string,
    public theme?: string,
    public displayType?: string,
    public selectedTab?: number,
    public showPlayerBar?: boolean,
    public isMiniSideBar?: boolean,
    public multiPlayer?: boolean,
    public onPlayList?: PlaylistItem[],
    public historicList?: PlaylistItem[],
    public selectedPl?: string,
    ) {
        this.langage       = langage       || 'en';
        this.theme         = theme         || 'dark';
        this.displayType   = displayType   || 'grid';
        this.selectedTab   = selectedTab   || 1;
        this.showPlayerBar = showPlayerBar || false;
        this.isMiniSideBar = isMiniSideBar || false;
        this.multiPlayer   = multiPlayer   || true;
        this.onPlayList    = onPlayList    || [];
        this.historicList  = historicList  || [];
        this.selectedPl    = selectedPl    || '';
    }
}
