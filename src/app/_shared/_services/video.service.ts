import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp } from '@angular/http';
import 'rxjs/add/operator/mergeMap';

import { CONSTANT } from '../../constant';

@Injectable()
export class VideoService {


    constructor(
        private http: Http,
        private jsonp: Jsonp) {}

    /*
    searchVideo(query: string) {
        // &maxResults=50
        return this.http.get(`${CONSTANT.YT_API_URL}search?q=${query}&key=${CONSTANT.YT_API_TOKEN}`
        + `&part=snippet&maxResults=10`)
        .map((res: Response) => res.json())
        .flatMap((searchData) => {
            const idList = [];
            searchData.items.forEach(item => {
                idList.push(item.id.videoId);
            });
            const idJoined = idList.join(',');
            return this.http.get(`${CONSTANT.YT_API_URL}videos?part=snippet,contentDetails&id=${idJoined}&key=${CONSTANT.YT_API_TOKEN}`)
                   .map((response: Response) => response.json());
        });
    }
    */


    /*
    autocompleteSearchVideo(query: String) {
        `?q=${query}&client=youtube&hl=fr&ds=yt`
        return this.http.get(`${CONSTANT.YT_API_AC_SEARCH_URL}?q=${query}&key=${CONSTANT.YT_API_TOKEN}&part=snippet&maxResults=10`)
        .map((res: Response) => res.json());
    }
    */

    searchSuggestsVideo(query: String) {
        return this.jsonp.request(`${CONSTANT.YT_API_AC_SEARCH_URL}?q=${query}&client=youtube&hl=fr&ds=yt&callback=JSONP_CALLBACK`)
        .map((res: Response) => res.json());
    }

    search(query: String) {
        return this.http.get(`${CONSTANT.YT_API_SEARCH_URL}?q=${query}&key=${CONSTANT.YT_API_TOKEN}`
        + `&part=snippet&maxResults=10`)
        .map((res: Response) => res.json())
        .flatMap((searchData) => {
            const idList = [];
            searchData.items.forEach(item => {
                idList.push(item.id.videoId);
            });
            const idJoined = idList.join(',');
            return this.http.get(`${CONSTANT.YT_API_VIDEOS_URL}?part=snippet,contentDetails&id=${idJoined}`
            + `&key=${CONSTANT.YT_API_TOKEN}`)
                   .map((response: Response) => response.json());
        });
    }





    // stantby

    SearchVideo(query: String) {
        return this.http.get(`${CONSTANT.YT_API_AC_SEARCH_URL}?q=${query}&key=${CONSTANT.YT_API_TOKEN}&part=snippet&maxResults=10`)
        .map((res: Response) => res.json())
        .map((json) => {

            console.log(json);
            return json;
        });
    }

    SearchMetadataVideo(idList: String) {
        return this.http.get(`${CONSTANT.YT_API_VIDEOS_URL}?part=snippet,contentDetails&id=${idList}&key=${CONSTANT.YT_API_TOKEN}`)
        .map((res: Response) => res.json());
    }
}
