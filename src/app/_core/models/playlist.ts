import { PlaylistItem, Thumbnail } from './';
import { PlayerComponent } from '../../player-panel/player/player.component';

/*
export class Playlist {

    readonly type = 'Playlist';

    constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public thumbUrl?: string,
    public thumbH?: number,
    public thumbW?: number,
    public publishedAt?: string,
    public privacyStatus?: string,
    public isLocal?: boolean,
    public videolist?: PlaylistItem[],
    public appId?: string
    ) {
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
        this.appId         = appId;
    }
}
*/

export enum PlayListType {
    ONPLAY = 'onplay',
    HISTORIC = 'historic',
    PLAYLIST = 'playlist',
    WATCHLATER = 'watchLater',
    SEARCH = 'search'
}

export enum PrivacyStatus {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export class Playlist {
    constructor(
    readonly type?: PlayListType,
    public id?: string,
    public appId?: string,
    public title?: string,
    public description?: string,
    public thumb?: Thumbnail,
    public publishedAt?: string,
    public privacyStatus?: PrivacyStatus,
    public isLocal?: boolean,
    public videolist?: PlaylistItem[],
    ) {
        this.type          = type;
        this.id            = id;
        this.appId         = appId;
        this.title         = title;
        this.description   = description;
        this.thumb         = thumb;
        this.publishedAt   = publishedAt;
        this.privacyStatus = privacyStatus;
        this.isLocal       = isLocal;
        this.videolist     = videolist;
    }
}

export class PlaylistFactory {
    static create(type: PlayListType, pl: Playlist) {
        return new Playlist(
            type,
            pl.id            || '',
            pl.appId         || '',
            pl.title         || '',
            pl.description   || '',
            pl.thumb         || { url: 'assets/images/pochette.png'},
            pl.publishedAt   || new Date().toLocaleTimeString(),
            pl.privacyStatus || PrivacyStatus.PRIVATE,
            pl.isLocal       || true,
            pl.videolist     || [],
            
        )
    }
}
