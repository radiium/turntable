import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import { OnlineService } from './_core/_services/online.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    viewProviders:  [DragulaService]
})
export class AppComponent implements OnInit, OnDestroy {
    isOnline: Boolean = false;
    dragulaBagName = 'drag-drop-list';

    constructor(
        private onlineService: OnlineService,
        private dragulaService: DragulaService) {

        this.onlineService.isOnline$.subscribe((isOnline) => {
            this.isOnline = isOnline;
        });
    }

    ngOnInit() {
        this.initDragula();
    }

    ngOnDestroy() {
        this.destroyDragula();
    }

    // Init dragula service options
    initDragula() {
        this.dragulaService.setOptions(
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
        if (!!this.dragulaService.find(this.dragulaBagName)) {
            this.dragulaService.destroy(this.dragulaBagName);
        }
    }
}
