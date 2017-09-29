import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import { TabsService } from './_core/services/tabs.service';
import { Observable } from 'rxjs/Observable';

import { YoutubePlayerService } from './_shared/modules/ng2-youtube-player/services/youtube-player.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    viewProviders:  [DragulaService]
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {

    dragulaBagName = 'drag-drop-list';
    selectedTab: any;

    isLoading: Boolean = false;

speed;
onSpeedChange(e) {
}
    constructor(
        public ytService: YoutubePlayerService,
        private _dragulaService: DragulaService,
        private _tabsService: TabsService) {
            Observable.timer(3000).subscribe((res) => {
                this.isLoading = false;
            });

            this._tabsService.selectedTab$
            .subscribe((st) => {
                this.selectedTab = st;
            });
            this._tabsService.setSelectedTab(1);

    }
    ngOnInit() { this.initDragula(); }
    ngOnDestroy() { this.destroyDragula(); }
    ngAfterContentInit() {
        // this.isLoading = false;
    }

    // Init dragula service options
    initDragula() {
        this._dragulaService.setOptions(
            this.dragulaBagName, {
            revertOnSpill: true,
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true';
            },
            copy: (el, source): boolean => {
                return source.dataset.acceptDrop === 'false';
            },
            accepts: (el, target, source, sibling): boolean => {
                return target.dataset.acceptDrop === 'true';
            },
        });
        /*
        this.dragulaService.dragend.subscribe((el) => {
        });
        this.dragulaService.over.subscribe((val) => {
        });
        */
    }

    // Destroy dragula service
    destroyDragula() {
        if (!!this._dragulaService.find(this.dragulaBagName)) {
            this._dragulaService.destroy(this.dragulaBagName);
        }
    }
}
