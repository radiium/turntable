import { Thumbnail } from 'core/models';

export class PlaylistItem {
    constructor(
        readonly type?: string,
        public id?: string,
        public appId?: string,
        public title?: string,
        public description?: string,
        public thumb?: Thumbnail,
        public duration?: any,
        public channelTitle?: string,
        public publishedAt?: any,
        public selected?: boolean
        ) {
            this.id = id;
            this.appId = appId;
            this.title = title;
            this.description = description;
            this.thumb = thumb;
            this.duration = duration;
            this.channelTitle = channelTitle;
            this.publishedAt = publishedAt;
            this.selected = selected;
    }
}

export class PlaylistItemFactory {
    static create(plItem: PlaylistItem) {
        return new PlaylistItem(
            'PlaylistItem',
            plItem.id           || '',
            plItem.appId        || '',
            plItem.title        || '',
            plItem.description  || '',
            plItem.thumb        || { url: 'assets/images/pochette.png'},
            plItem.duration     || '',
            plItem.channelTitle || '',
            plItem.publishedAt  || '',
            plItem.selected     || false,
        );
    }
}
