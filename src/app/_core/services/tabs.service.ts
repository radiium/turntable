import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TabsService {
    private selectedTab = new Subject<any>();
    selectedTab$ = this.selectedTab.asObservable();
    setSelectedTab(st) { this.selectedTab.next(st); }
}
