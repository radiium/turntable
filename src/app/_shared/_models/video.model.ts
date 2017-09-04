export class VideoModel {

    constructor(
        public videoId: string,
        public title: string,
        public thumbnailUrl: string,
        public channelTitle: string,
        public channelId: string,
        public description: string,
        public duration: any) {
            this.videoId = videoId;
            this.title = title;
            this.thumbnailUrl = thumbnailUrl;
            this.channelTitle = channelTitle;
            this.channelId = channelId;
            this.description = description;
            this.duration = duration;
    }
}
