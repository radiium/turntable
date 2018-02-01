export class Video {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public thumbUrl: string,
        public duration: any,
        public channelTitle: any,
        public publishedAt: any
        ) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.thumbUrl = thumbUrl;
            this.duration = duration;
            this.channelTitle = channelTitle;
            this.publishedAt = publishedAt;
    }
}
