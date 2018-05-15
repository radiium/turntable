import { Video } from './video.model';

export class Playlist {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public thumbUrl: string,
        public thumbH: number,
        public thumbW: number,
        public publishedAt: string,
        public privacyStatus: string,
        public isLocal: boolean,
        public videolist?: Array<Video>) {
            this.id            = id;
            this.title         = title;
            this.description   = description;
            this.thumbUrl      = thumbUrl;
            this.thumbH        = thumbH;
            this.thumbW        = thumbW;
            this.publishedAt   = publishedAt;
            this.privacyStatus = privacyStatus;
            this.isLocal       = isLocal;
            this.videolist     = videolist;
    }
}
