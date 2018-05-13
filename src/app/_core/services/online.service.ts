import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/mapTo';

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
