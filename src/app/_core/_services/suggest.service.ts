import { Injectable, Input } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Video } from '../../_shared/models/video.model';
import { Suggests } from '../../_shared/models/suggests.model';

import { CONSTANT } from '../../_shared/constant';

@Injectable()
export class SuggestService {

    // --------------------------------------------------------

    // Suggest list
    private suggestsResult = new Subject<Suggests>();
    suggestsResult$ = this.suggestsResult.asObservable();

    // SearchBar results list
    private resultsList = new Subject<Video[]>();
    resultsList$ = this.resultsList.asObservable();

    constructor(
        private http: Http,
        private jsonp: Jsonp) {}

    // --------------------------------------------------------
    // Setters

    setSuggestsResult(rl) { this.suggestsResult.next(rl); }

    searchSuggestsVideo(query: String) {
        return this.jsonp.request(`${CONSTANT.SUGGEST_API}?q=${query}&client=youtube&hl=fr&ds=yt&callback=JSONP_CALLBACK`)
        .map((res: Response) => res.json());
    }
}
