export class PlaylistItem {

    readonly type = 'PlaylistItem';

    constructor(
        public id?: string,
        public selected?: boolean,
        public title?: string,
        public description?: string,
        public thumbUrl?: string,
        public duration?: any,
        public channelTitle?: any,
        public publishedAt?: any,
        public appId?: string
        ) {
            this.id = id;
            this.selected = selected;
            this.title = title;
            this.description = description;
            this.thumbUrl = thumbUrl;
            this.duration = duration;
            this.channelTitle = channelTitle;
            this.publishedAt = publishedAt;
            this.appId = appId;
    }
}
