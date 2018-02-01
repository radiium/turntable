export class AppState {
    constructor(
        public langage: string,
        public theme: string,
        public displayType: string,
        public selectedTab: number
    ) {
        this.langage     = langage     || 'en';
        this.theme       = theme       || 'dark';
        this.displayType = displayType || 'grid';
        this.selectedTab = selectedTab || 1;
    }
}
