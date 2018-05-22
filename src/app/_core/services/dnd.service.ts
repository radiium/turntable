import { Injectable, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import { Subject } from 'rxjs/Subject';

import * as autoScroll from 'dom-autoscroller';
import * as _ from 'lodash';

import { DataService } from 'core/services/data.service';
import { PlayerStateService } from 'core/services/player-state.service';
import { User,
         Playlist,
         PlaylistItem,
         Suggests,
         SearchResults,
         PlayerPanelState } from 'core/models';
import { Subscription } from 'rxjs';

@Injectable()
export class DndService implements OnDestroy {

    vlBag = 'videolistBag';
    playerBag = 'playerListBag';
    private srDrake: any;

    plButtonContainer: ElementRef;
    plDetailContainer: ElementRef;
    playerListContainer: ElementRef;

    playlistsList: Array<Playlist>;
    searchResults: SearchResults;
    onPlayList: Array<PlaylistItem>;
    historicList: Array<PlaylistItem>;
    onSelectPL: Array<PlaylistItem>;

    selectedTab: number;
    plPanelState: PlayerPanelState;

    scroll: any;
    autoScrollConfig = {
        margin: 20,
        maxSpeed: 20,
        scrollWhenOutside: false
    };
    eventSubcriptions: Subscription[];

    currentEl: any = null;


    constructor(
        private ngZone: NgZone,
        private dragulaService: DragulaService,
        private dataSrv: DataService,
        private playerState: PlayerStateService) {
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.vlBag);
        this.dragulaService.destroy(this.playerBag);

        this.unsubscribeEvent();
    }

    initDnd() {
        // Init playlist details drag
        this.dragulaService.setOptions(
            this.playerBag, {
            revertOnSpill: true,
            removeOnSpill: false,
            moves: (el, source, handle, sibling): boolean => {
                return handle.classList.contains('handle');
            }
        });

        this.initVideoListBag();

        // Listen dragula event
        this.subscribeEvent();
    }

    initVideoListBag() {
        const vlBag = this.dragulaService.find(this.vlBag);
        if (vlBag) {
            this.dragulaService.destroy(this.vlBag);
        }

        // Init search result drag
        this.dragulaService.setOptions(this.vlBag, {
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
                const accept = (el.dataset.plid && target.dataset.plid)
                             && el.dataset.from === 'detail'
                             && target !== source
                    ? !(el.dataset.plid === target.dataset.plid)
                    : true;
                return (target.dataset.acceptdrop === 'true') && accept;
            },
        });
    }


    // ------------------------------------------------------------------------
    // EVENTS


    subscribeEvent() {
        this.eventSubcriptions = [

            // Datas subscription
            this.playerState.playerPanelState$.subscribe((data) => {

            }),
            this.dataSrv.playlistsList$.subscribe((data) => this.playlistsList = data),
            this.dataSrv.searchResults$.subscribe((data) => this.searchResults = data),
            this.dataSrv.appState$.subscribe((data) => {
                this.selectedTab = data.selectedTab;
                this.historicList = data.historicList;
                this.onPlayList = data.onPlayList;
                const selectedPl = _.find(this.playlistsList, { id: data.selectedPl });
                if (selectedPl) {
                    this.onSelectPL = selectedPl.videolist;
                }
            }),

            // Dragula event subscription
            this.dragulaService.over.subscribe((value) => {
                this.ngZone.runOutsideAngular(() => {
                    this.onOver(value[0], value.slice(1));
                });
            }),
            this.dragulaService.out.subscribe((value) => {
                this.ngZone.runOutsideAngular(() => {
                    this.onOut(value[0], value.slice(1));
                });
            }),
            this.dragulaService.drop.subscribe((value) => {
                this.ngZone.runOutsideAngular(() => {
                    this.onDrop(value[0], value.slice(1));
                });
            }),
            this.dragulaService.dropModel.subscribe((value) => {
                this.ngZone.runOutsideAngular(() => {
                    this.onDropModel(value[0], value.slice(1));
                });
            }),
            this.dragulaService.drag.subscribe((value) => {
                this.ngZone.runOutsideAngular(() => {
                    this.onDrag(value[0], value.slice(1));
                });
            }),
            this.dragulaService.dragend.subscribe((value) => {
                this.ngZone.runOutsideAngular(() => {
                    this.onDragend(value[0], value.slice(1));
                });
            })
        ];
    }

    unsubscribeEvent() {
        _.each(this.eventSubcriptions, (sub) => {
            sub.unsubscribe();
        });
    }



    /* EXAMPLE
    dragulaService.drag.subscribe(value => {
        document.onmousemove = (e) => {
            let event = e || window.event;
            let mouseY = event['pageY'];
            let scrollTop = document.documentElement.scrollTop
                ? document.documentElement.scrollTop
                // document.documentElement.scrollTop is undefined on the Edge browser
                let scrollBottom = scrollTop + window.innerHeight;
                : document.body.scrollTop;

            // this is to get the height of the dragged element
            let elementHeight = value[1].offsetHeight;

            if (mouseY - elementHeight / 2 < scrollTop) {
                window.scrollBy(0, -15);
            } else if (mouseY + elementHeight > scrollBottom) {
                window.scrollBy(0, 15);
            }
        };
    });

    // detach the mouse move event when the drag ends
    dragulaService.dragend.subscribe(value => {
        document.onmousemove = null;
    });
    */
    private onDrag(bagName: string, args) {
        const [el, source] = args;

        this.currentEl = el;

        if (el.dataset.from === 'search') {
            this.createAutoScroll('search');

        } else if (el.dataset.from === 'detail') {
            this.createAutoScroll('detail');

        } else if (el.dataset.from === 'onplay') {
            this.createAutoScroll('onplay');
        }
    }

    private onDragend(bagName: string, args) {
        const [el] = args;
        this.currentEl = null;
        this.destroyAutoScroll(true);
    }

    private onOver(bagName: string, args) {
        const [el, target, source] = args;

        if (bagName === this.playerBag) {

        } else if (bagName === this.vlBag) {
            if (el.dataset.from === 'detail' && target === source) {
                const element = target.querySelectorAll('[data-vid=\'' + el.dataset.vid + '\']:not(.gu-transit)').item(0);
                if (element) {
                    element.style.display = 'none';
                }
            }
            // else if (el.dataset.from === 'search') {}
            if (target.dataset.hideshadow === 'true') {
                target.classList.add('btnHoveredDrop');
            }
        }
    }

    private onOut(bagName: string, args) {
        const [el, target, source] = args;

        if (bagName === this.playerBag) {

        } else if (bagName === this.vlBag) {
            if (el.dataset.from === 'detail') {
                const element = target.querySelectorAll('[data-vid=\'' + el.dataset.vid + '\']:not(.gu-transit)').item(0);
                if (element) {
                    element.style.display = '';
                }
            }
            // elseif (el.dataset.from === 'search') {}
            if (target.dataset.hideshadow === 'true') {
                target.classList.remove('btnHoveredDrop');
            }
        }
    }

    private onDrop(bagName: string, args) {

        const [el, target, source] = args;

        if (bagName === this.playerBag) {

        } else if (bagName === this.vlBag) {
            let video: PlaylistItem;
            let plSourceIndex: number;
            let plTargetIndex: number;
            let videoList;
            const from = el.dataset.from;


            // Video to drop from searchresults
            if (from === 'search') {
                video = (<PlaylistItem>_.find(_.union.apply(null, this.searchResults.results), {id: el.dataset.vid}));

            // Video to drop from on play list
            } else if (from === 'onplay') {
                video = _.find(this.onPlayList, {id: el.dataset.vid});

            // Video to drop from historicList
            } else if (from === 'historic') {
                video = _.find(this.historicList, {id: el.dataset.vid});

            // Video to drop from a playlist
            } else {
                plSourceIndex = _.findIndex(this.playlistsList, {id: el.dataset.plid});
                video = _.find(this.playlistsList[plSourceIndex].videolist, {id: el.dataset.vid});
            }


            // Drop on navbar playlist
            if (target.classList.contains('dropZone')) {
                plTargetIndex = _.findIndex(this.playlistsList, {id: target.dataset.plid});
                this.playlistsList[plTargetIndex].videolist.push(video);
                // Remove element dropped in playlist button
                el.remove();

             // Reorder playlist
            } else if (target.classList.contains('detail') && target === source) {
                plTargetIndex = _.findIndex(this.playlistsList, {id: target.dataset.plid});
                videoList = this.playlistsList[plTargetIndex].videolist;

                const nodes = Array.prototype.slice.call(target.children);
                const elIdx = nodes.indexOf(el);
                this.move(parseInt(el.dataset.index, 10), elIdx, videoList);
                this.playlistsList[plTargetIndex].videolist = _.cloneDeep(videoList);

                // Replace dropped element by the original element
                el.classList.add('dropped');
                if (this.currentEl) {
                    el.parentNode.replaceChild(this.currentEl, el);
                }


            } else if (target.classList.contains('onplay') && target === source) {
                const nodes = Array.prototype.slice.call(target.children);
                const elIdx = nodes.indexOf(el);
                this.move(parseInt(el.dataset.index, 10), elIdx, this.onPlayList);

                // Replace dropped element by the original element
                el.classList.add('dropped');
                if (this.currentEl) {
                    el.parentNode.replaceChild(this.currentEl, el);
                }
            }

            if (target.classList.contains('onplay')) {
                this.dataSrv.setOnPlayList(this.onPlayList);
            } else {
                this.dataSrv.setPlaylistsList(this.playlistsList);
            }
        }
    }

    private onDropModel(bagName: string, args) {
        const [el, target, source] = args;

        if (bagName === this.playerBag) {
            this.dataSrv.setOnPlayList(this.onPlayList);
        }
    }






    createAutoScroll(scrollSrc: string) {
        const boxList = [];
        switch (scrollSrc) {
            case 'search':
                if (this.plButtonContainer) {
                    boxList.push(this.plButtonContainer.nativeElement);
                }
                break;
            case 'detail':
                if (this.plButtonContainer && this.plDetailContainer) {
                    boxList.push(this.plButtonContainer.nativeElement);
                    boxList.push(this.plDetailContainer.nativeElement);
                }
                break;
            case 'onplay':
                if (this.playerListContainer) {
                    boxList.push(this.playerListContainer.nativeElement);
                }
                break;
            default:
                break;
        }

        if (boxList.length > 0) {
            this.scroll = autoScroll(boxList, {
                margin: this.autoScrollConfig.margin || 20,
                maxSpeed: this.autoScrollConfig.maxSpeed || 6,
                scrollWhenOutside: this.autoScrollConfig.scrollWhenOutside || true,
                autoScroll: () => true
            });
        }
    }

    destroyAutoScroll(cleanAnimation: boolean) {
        if (this.scroll) {
            this.scroll.destroy(cleanAnimation);
            this.scroll = null;
        }
    }

    move(fromIndex, toIndex, arr) {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
}
