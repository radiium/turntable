import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable} from "rxjs/observable/TimerObservable";
import 'rxjs/add/observable/timer';

import { UUID } from 'angular2-uuid';

interface TimerList {
    [name: string]: {
        second: number,
        observable: Observable<any>
    };
}

interface SubscriptionList {
    [id: string]: {
        name: string,
        subscription: Subscription
    };
}

@Injectable()
export class TimerService {

    private timerList: TimerList = {};
    private subscription: SubscriptionList = {};

    getTimer(): string[] {
        return Object.keys(this.timerList);
    }

    getSubscription(): string[] {
        return Object.keys(this.subscription);
    }

    newTimer(name: string, millisec: number): boolean {
        if (name === undefined || millisec === undefined || this.timerList[name]) {
            return false;
        }
        const o = Observable.timer(0, millisec);
        this.timerList[name] = { second: millisec, observable: o };
        return true;
    }

    delTimer(name: string): boolean {
        if (name === undefined || !this.timerList[name]) {
            return false;
        }
        const s = this.getSubscription();
        // unsubscribe all subscription for queue 'name'
        s.forEach(i => {
            if (this.subscription[i].name === name) {
                this.unsubscribe(i);
            }
        });
        // delete queue 'name' subject and observable
        delete this.timerList[name].observable;
        delete this.timerList[name];
    }

    /**
     *
     * @param name
     * @param callback
     */
    subscribe(name: string, callback: () => void): string {
        if (!this.timerList[name]) {
            return '';
        }

        const id = name + '-' + UUID.UUID();
        this.subscription[id] = {
            name: name,
            subscription: this.timerList[name].observable.subscribe(callback)
        };
        return id;
    }

    /**
     *
     * @param id
     */
    unsubscribe(id: string): boolean {
        if (!id || !this.subscription[id]) {
            return false;
        }
        console.log('unsubscribe', id);
        this.subscription[id].subscription.unsubscribe();
        delete this.subscription[id];
    }
}
