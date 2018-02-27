import { Injectable, OnDestroy, ElementRef } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as autoScroll from 'dom-autoscroller';
import * as _ from 'lodash';

import { DataService } from 'core/services//data.service';
import { User,
         Playlist,
         Video,
         Suggests,
         SearchResults } from 'core/models';

@Injectable()
export class DndService implements OnDestroy {

    srBag = 'searchResultsBag';
    private srDrake: any;

    plButtonContainer: ElementRef;
    plDetailContainer: ElementRef;
    autoScrollConfig = {
        margin: 20,
        maxSpeed: 10,
        scrollWhenOutside: false
    };

    playlistsList: Array<Playlist>;
    searchResults: SearchResults;
    selectedTab: number;

    scroll: any;

    constructor(
    private dragulaService: DragulaService,
    private dataService: DataService) {

        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        this.dataService.searchResults$.subscribe((data) => {
            this.searchResults = data;
        });

        this.dataService.selectedTab$.subscribe((data) => {
            this.selectedTab = data;
        });
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.srBag);
        // this.dragulaService.destroy(this.pldBag);
    }

    initDnd() {

        /*
        // Init playlist details drag
        this.dragulaService.setOptions(
            this.pldBag, {
            revertOnSpill: true,
            removeOnSpill: false,
            moves: (el, source, handle, sibling): boolean => {
                return handle.classList.contains('handle');
            }
        });
        */


        // Init search result drag
        this.dragulaService.setOptions(
            this.srBag, {
            revertOnSpill: true,
            removeOnSpill: true,
            // mirrorContainer: document.getElementsByClassName('appWrapper').item(0),
            copy: true,
            copySortSource: true,
            moves: (el, source, handle, sibling): boolean => {
                return handle.classList.contains('handle');
            },
            accepts: (el, target, source, sibling): boolean => {

                // prevents drop on itself by sidenav playlist
                const accept = (el.dataset.plid && target.dataset.plid) && !target.classList.contains('plDetail')
                    ? !(el.dataset.plid === target.dataset.plid)
                    : true;

                return (target.dataset.acceptdrop === 'true') && accept;
            },
        });


        // Get drake from each bag
        this.srDrake   = this.dragulaService.find(this.srBag).drake;


        // Listen dragula event
        this.dragulaService.over.subscribe((value) => {
           this.onOver(value[0], value.slice(1));
        });
        this.dragulaService.out.subscribe((value) => {
            this.onOut(value[0], value.slice(1));
        });
        this.dragulaService.drop.subscribe((value) => {
            this.onDrop(value[0], value.slice(1));
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
        const [el, target, source] = args;

        if (el.dataset.searchresults === 'true') {
        } else {
            if (target === source) {
                const element = target.querySelectorAll("[data-vid='" + el.dataset.vid + "']:not(.gu-transit)").item(0);
                if (element) {
                    element.style.display = 'none';
                }
            }
        }

        if (target.dataset.hideshadow === 'true') {
            target.classList.add('btnHoveredDrop');
        }
    }

    private onOut(bagName: string, args) {
        const [el, target, source] = args;

        if (el.dataset.searchresults === 'true') {
        } else {
            const element = target.querySelectorAll("[data-vid='" + el.dataset.vid + "']:not(.gu-transit)").item(0);
            if (element) {
                element.style.display = '';
            }
        }

        if (target.dataset.hideshadow === 'true') {
            target.classList.remove('btnHoveredDrop');
        }
    }

    private onDrop(bagName: string, args) {
        const [el, target, source] = args;
        let video: Video;
        let plSourceIndex: number;
        let plTargetIndex: number;

        // Video to drop from searchresults
        if (el.dataset.searchresults === 'true') {
            video = _.find(_.union.apply(null, this.searchResults.results), {id: el.dataset.vid});

        // Video to drop a playlist
        } else {
            plSourceIndex = _.findIndex(this.playlistsList, {id: el.dataset.plid});
            video = _.find(this.playlistsList[plSourceIndex].videolist, {id: el.dataset.vid});
        }

        // Drop on navbar playlist
        if (target.tagName === 'BUTTON' && target.classList.contains('plDrop')) {
            plTargetIndex = _.findIndex(this.playlistsList, {id: target.dataset.plid});
            this.playlistsList[plTargetIndex].videolist.push(video)
            this.dataService.setPlaylistsList(this.playlistsList);

        // Reorder playlist
        } else if (target.tagName === 'DIV' && target.classList.contains('plDetail') && target === source) {
            plTargetIndex = _.findIndex(this.playlistsList, {id: target.dataset.plid});
            const videoList = this.playlistsList[plTargetIndex].videolist;
            const newVideoList = _.chain(target.children)
                .map((node) => { return node['dataset'].vid})
                .map((videoId) => { return _.find(videoList, {id: videoId});})
                .value();
            this.playlistsList[plTargetIndex].videolist = newVideoList;
            this.dataService.setOnSelectPL(this.playlistsList[plTargetIndex]);
            this.dataService.setPlaylistsList(this.playlistsList);
        }
        el.remove();
    }

    private onDropModel(bagName: string, args) {
        const [el, target, source] = args;
    }

    private onDrag(bagName: string, args) {
        const [el, source] = args;
        if (source.classList.contains('plDetail')) {
            this.createAutoScroll(true);
        } else {
            this.createAutoScroll(false);
        }
    }

    private onDragend(bagName: string, args) {
        const [el] = args;
        this.destroyAutoScroll(true);
    }

    createAutoScroll(withPlDetail: boolean) {
        const boxList = [];
        if (this.plButtonContainer) {
            boxList.push(this.plButtonContainer.nativeElement);
        }
        if (this.plDetailContainer && withPlDetail) {
            boxList.push(this.plDetailContainer.nativeElement);
        }

        if (boxList.length > 0) {
            this.scroll = autoScroll(boxList, {
                margin: this.autoScrollConfig.margin || 20,
                maxSpeed: this.autoScrollConfig.maxSpeed || 6,
                scrollWhenOutside: this.autoScrollConfig.scrollWhenOutside || true,
                autoScroll: () => {
                    return  true; // this.scroll.down; //this.plButtonAutoScroll.scroll.down || this.plDetailAutoScroll.scroll.down; // autoScrollConfig.selectedTab === this.selectedTab;
                }
            });
        }
    }

    destroyAutoScroll(cleanAnimation: boolean) {
        if (this.scroll) {
            this.scroll.destroy(cleanAnimation);
            this.scroll = null;
        }
    }

    /*
    createAutoScroll(autoScrollConfig: AutoScrollConfig) {
        if (autoScrollConfig.container) {
            autoScrollConfig.scroll = autoScroll(
                [autoScrollConfig.container.nativeElement], {
                margin: autoScrollConfig.margin || 20,
                maxSpeed: autoScrollConfig.maxSpeed || 6,
                scrollWhenOutside: autoScrollConfig.scrollWhenOutside || true,
                autoScroll: () => {

                    let down = false;
                    if (this.plButtonAutoScroll && this.plButtonAutoScroll.scroll) {
                        down = this.plButtonAutoScroll.scroll.down;
                    } else if (this.plDetailAutoScroll && this.plDetailAutoScroll.scroll) {
                        down = this.plDetailAutoScroll.scroll.down;
                    }
                    console.log('down', down);

                    return  down; //this.plButtonAutoScroll.scroll.down || this.plDetailAutoScroll.scroll.down; // autoScrollConfig.selectedTab === this.selectedTab;
                }
            });
        }
    }

    destroyAutoScroll(autoScrollConfig: AutoScrollConfig, cleanAnimation: boolean) {
        if (autoScrollConfig.scroll) {
            autoScrollConfig.scroll.destroy(cleanAnimation);
        }
    }
    */
}
