import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OnlineService {

    isOnline$: Observable<boolean>;

    constructor() {
        this.isOnline$ = Observable.merge(
            Observable.of(navigator.onLine),
            Observable.fromEvent(window, 'online').mapTo(true),
            Observable.fromEvent(window, 'offline').mapTo(false)
        );
    }
}
