export class AppState {
    constructor(
    public langage?: string,
    public theme?: string,
    public displayType?: string,
    public selectedTab?: number,
    public showPlayerBar?: boolean,
    public loading?: boolean,
    public isMiniSideBar?: boolean
    ) {
        this.langage       = langage       || 'en';
        this.theme         = theme         || 'dark';
        this.displayType   = displayType   || 'grid';
        this.selectedTab   = selectedTab   || 1;
        this.showPlayerBar = showPlayerBar || false;
        this.loading       = loading       || false;
        this.isMiniSideBar = isMiniSideBar || false;
    }
}
