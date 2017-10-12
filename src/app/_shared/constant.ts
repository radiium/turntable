// import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import { environment } from '../../environments/environment';

// @Injectable()
export class CONSTANT {

    public static USER_API      = 'https://www.googleapis.com/oauth2/v1/userinfo';
    public static SUGGEST_API   = 'http://suggestqueries.google.com/complete/search';
    public static SEARCH_API    = 'https://www.googleapis.com/youtube/v3/search';
    public static VIDEO_API     = 'https://www.googleapis.com/youtube/v3/videos';
    public static PLAYLIST_API  = 'https://www.googleapis.com/youtube/v3/playlists';
    public static PLAYLIST_ITEMS_API  = 'https://www.googleapis.com/youtube/v3/playlistItems';


    public static AUTH_API      = 'https://accounts.google.com/o/oauth2/auth';
    public static TOKEN_API     = 'https://accounts.google.com/o/oauth2/token';
    public static LOGOUT_API    = 'https://accounts.google.com/o/oauth2/revoke';
    public static LOGOUT2_API    = 'https://accounts.google.com/logout';
    public static REDIRECT_URI  = 'http://localhost';
    public static TOKEN_INFO_API = 'https://www.googleapis.com/oauth2/v1/tokeninfo';

    public static KEY_API       = 'AIzaSyCUgeZ1Wous0x3Rjw3EZQQPKDQTXJB21Es';
    public static CLIENT_ID     = '164595742192-h6rci5hnhj8gfbbeaijsrrsu660d80r6.apps.googleusercontent.com';
    public static CLIENT_SECRET = 'Q38usximxeb3rJXAUajjVRlY';

    public static SCOPE =
        'https://www.googleapis.com/auth/youtube ' +
        'https://www.googleapis.com/auth/youtube.force-ssl ' +
        'https://www.googleapis.com/auth/userinfo.profile';
}
