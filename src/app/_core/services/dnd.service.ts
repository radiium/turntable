import { Injectable, OnDestroy } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as _ from 'lodash';

import { User, Playlist, Video, Suggests, SearchResults } from 'core/models';
import { DataService } from 'core/services//data.service';

@Injectable()
export class DndService implements OnDestroy {

    searchResultsBag = 'searchResultsBag';
    private searchResultsDrake: any;

    playlistDetailsBag = 'playlistDetailsBag';
    private playlistDetailsDrake: any;

    playlistsList: Array<Playlist>;

    constructor(
    private dragulaService: DragulaService,
    private dataService: DataService) {
        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.playlistDetailsBag);
        this.dragulaService.destroy(this.searchResultsBag);
    }

    initDnd() {

        const that = this;

        this.dragulaService.setOptions(
            this.playlistDetailsBag, {
            // revertOnSpill: true,
            removeOnSpill: true,
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true' && handle.classList.contains('handle');
            }
        });


        this.dragulaService.setOptions(
            this.searchResultsBag, {
            // revertOnSpill: true,
            removeOnSpill: true,
            mirrorContainer: document.getElementsByClassName('appWrapper')[0],
            copy: true,
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true' && handle.classList.contains('handle');
            },
            accepts: (el: HTMLElement, target: HTMLElement, source, sibling): boolean => {
                /*
                // Prevent duplicate
                let accept = true;
                if (source !== target) {
                    that.videolist.forEach(video => {
                        if (el.dataset.id === video.id) {
                            accept = false;
                        }
                    });
                }
                */
                return target.dataset.acceptdrop === 'true'; // (accept && target.dataset.acceptDrop === 'true');
            },
        });

        // Get drake from each bag
        this.searchResultsDrake   = this.dragulaService.find(this.searchResultsBag).drake;
        this.playlistDetailsDrake = this.dragulaService.find(this.playlistDetailsBag).drake;


        /*

        */

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
        this.dragulaService.drop.subscribe((value) => {
            this.onDrop(value[0], value.slice(1));
        });


        /*
        this.dragulaService.shadow.subscribe((value) => {
            this.onShadow(value[0], value.slice(1));
        });
        this.dragulaService.dragend.subscribe((value) => {
            this.onDragend(value[0], value.slice(1));
        });
        this.dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value[0], value.slice(1));
        });
        */
    }

    private onOver(bagName: string, args) {
        const [el, container, source] = args;
        if (bagName === this.searchResultsBag) {
            if (container !== source) {
                container.classList.add('btnHoveredDrop');
            }
        } else if (bagName === this.playlistDetailsBag) {

        }
    }

    private onOut(bagName: string, args) {
        const [el, container, source] = args;
        if (bagName === this.searchResultsBag) {
            container.classList.remove('btnHoveredDrop');
        } else if (bagName === this.playlistDetailsBag) {

        }
    }

    private onDropModel(bagName: string, args) {
        const [el, container, source] = args;
        if (bagName === this.searchResultsBag) {
            this.dataService.setPlaylistsList(this.playlistsList);
        } else if (bagName === this.playlistDetailsBag) {

        }
    }

    private onDrag(bagName: string, args) {
        const [el, source] = args;
        this.dataService.setIsOnDrag(true);
        /*
        if (bagName === this.searchResultsBag) {
            // el.classList.add('appListItemMirror');
        } else if (bagName === this.playlistDetailsBag) {

        }
        */
    }

    private onDrop(bagName: string, args) {
        const [el, target, source, sibling] = args;
        this.dataService.setIsOnDrag(false);
        /*
        if (bagName === this.searchResultsBag) {

        } else if (bagName === this.playlistDetailsBag) {

        }
        */
    }








    private onDragend(bagName: string, args) {
        const [el] = args;
        if (bagName === this.searchResultsBag) {
            // el.classList.remove('appListItemMirror');
        } else if (bagName === this.playlistDetailsBag) {

        }
    }


    private onShadow(bagName: string, args) {
        console.log('==========================');
        console.log('onShadow bagName', bagName);
        console.log('args', args);
        const [el, container, source] = args;

        if (bagName === this.searchResultsBag) {

        } else if (bagName === this.playlistDetailsBag) {

        }
    }

    private onRemoveModel(bagName: string, args) {
        console.log('==========================');
        console.log('onRemoveModel bagName', bagName);
        console.log('args', args);
        const [e, el, container] = args;

        if (bagName === this.searchResultsBag) {

        } else if (bagName === this.playlistDetailsBag) {

        }
    }
}
