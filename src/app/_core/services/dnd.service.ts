import { Injectable, OnDestroy, ElementRef } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';
import * as _ from 'lodash';

import { DataService } from 'core/services//data.service';
import { User,
         Playlist,
         Video,
         Suggests,
         SearchResults,
         AutoScrollConfig } from 'core/models';

@Injectable()
export class DndService implements OnDestroy {

    srBag = 'searchResultsBag';
    srAutoScroll: AutoScrollConfig;
    private srDrake: any;

    pldBag = 'playlistDetailsBag';
    pldAutoScroll: AutoScrollConfig;
    private pldDrake: any;

    playlistsList: Array<Playlist>;

    selectedTab: number;
    scroll: any;

    constructor(
    private dragulaService: DragulaService,
    private dataService: DataService) {

        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        this.dataService.selectedTab$.subscribe((data) => {
            this.selectedTab = data;
        });
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.pldBag);
        this.dragulaService.destroy(this.srBag);
    }

    initDnd() {

        // Init playlist details drag
        this.dragulaService.setOptions(
            this.pldBag, {
            revertOnSpill: true,
            removeOnSpill: false,
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true' && handle.classList.contains('handle');
            }
        });

        /*
        const coll = document.getElementsByClassName('appWrapper');
        console.log('mirror=', coll);
        console.log('mirror=', coll.length);
        console.log('mirror=', coll.item(0));
        */

        // Init search result drag
        this.dragulaService.setOptions(
            this.srBag, {
            revertOnSpill: true,
            removeOnSpill: true,
            // mirrorContainer: document.getElementsByClassName('appWrapper').item(0),
            copy: true,
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true' && handle.classList.contains('handle');
            },
            accepts: (el: HTMLElement, target: HTMLElement, source, sibling): boolean => {
                return target.dataset.acceptdrop === 'true';
            },
        });


        // Get drake from each bag
        this.srDrake   = this.dragulaService.find(this.srBag).drake;
        this.pldDrake = this.dragulaService.find(this.pldBag).drake;


        // Listen dragula event
        this.dragulaService.over.subscribe((value) => {
           this.onOver(value[0], value.slice(1));
        });
        this.dragulaService.out.subscribe((value) => {
            this.onOut(value[0], value.slice(1));
        });
        this.dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value[0], value.slice(1));
        });
        this.dragulaService.drag.subscribe((value) => {
            this.onDrag(value[0], value.slice(1));
        });
        this.dragulaService.dragend.subscribe((value) => {
            this.onDragend(value[0], value.slice(1));
        });
    }

    private onOver(bagName: string, args) {
        const [el, container, source] = args;
        if (bagName === this.srBag) {
            if (container !== source) {
                container.classList.add('btnHoveredDrop');
            }
        } else if (bagName === this.pldBag) {

        }
    }

    private onOut(bagName: string, args) {
        const [el, container, source] = args;
        if (bagName === this.srBag) {
            container.classList.remove('btnHoveredDrop');
        } else if (bagName === this.pldBag) {

        }
    }

    private onDropModel(bagName: string, args) {
        const [el, container, source] = args;
        if (bagName === this.srBag) {
            this.dataService.setPlaylistsList(this.playlistsList);
        } else if (bagName === this.pldBag) {

        }
    }

    private onDrag(bagName: string, args) {
        const [el, source] = args;
        if (bagName === this.srBag) {
            this.createAutoScroll(this.srAutoScroll);
        } else if (bagName === this.pldBag) {
            this.createAutoScroll(this.pldAutoScroll);
        }
    }

    private onDragend(bagName: string, args) {
        const [el] = args;
        if (bagName === this.srBag) {
            this.destroyAutoScroll(this.srAutoScroll, true);
        } else if (bagName === this.pldBag) {
            this.destroyAutoScroll(this.pldAutoScroll, true);
        }
    }

    createAutoScroll(autoScrollConfig: AutoScrollConfig) {
        if (autoScrollConfig.container) {
            autoScrollConfig.scroll = autoScroll(
                [autoScrollConfig.container.nativeElement], {
                margin: autoScrollConfig.margin || 20,
                maxSpeed: autoScrollConfig.maxSpeed || 6,
                scrollWhenOutside: true,
                autoScroll: () => {
                    return autoScrollConfig.selectedTab === this.selectedTab;
                }
            });
        }
    }

    destroyAutoScroll(autoScrollConfig: AutoScrollConfig, cleanAnimation: boolean) {
        if (autoScrollConfig.scroll) {
            autoScrollConfig.scroll.destroy(cleanAnimation);
        }
    }
}
