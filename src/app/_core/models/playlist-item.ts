export class PlaylistItem {
    constructor(
        public id: string,
        public selected: boolean,
        public title: string,
        public description: string,
        public thumbUrl: string,
        public duration: any,
        public channelTitle: any,
        public publishedAt: any
        ) {
            this.id = id;
            this.selected = selected;
            this.title = title;
            this.description = description;
            this.thumbUrl = thumbUrl;
            this.duration = duration;
            this.channelTitle = channelTitle;
            this.publishedAt = publishedAt;
    }
}
