// import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import { environment } from '../environments/environment';


// @Injectable()
export class CONSTANT {
    public static YT_API_SEARCH_URL   = 'https://www.googleapis.com/youtube/v3/search';
    public static YT_API_VIDEOS_URL   = 'https://www.googleapis.com/youtube/v3/videos';
    public static YT_API_URL   = 'https://www.googleapis.com/youtube/v3/search';
    public static YT_API_TOKEN = 'AIzaSyAJk1xUI72YYfBMgEc84gjHUX-k2AN6-B0';

    public static YT_API_AC_SEARCH_URL = 'http://suggestqueries.google.com/complete/search';

}
