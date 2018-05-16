import { Injectable, OnDestroy, ElementRef } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
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

@Injectable()
export class DndService implements OnDestroy {

    playerBag = 'playerListBag';
    srBag = 'searchResultsBag';
    private srDrake: any;

    plButtonContainer: ElementRef;
    plDetailContainer: ElementRef;
    playerListContainer: ElementRef;
    autoScrollConfig = {
        margin: 20,
        maxSpeed: 10,
        scrollWhenOutside: false
    };

    playlistsList: Array<Playlist>;
    searchResults: SearchResults;
    onPlayList: Array<PlaylistItem>;
    historicList: Array<PlaylistItem>;
    selectedTab: number;

    plPanelState: PlayerPanelState;

    scroll: any;

    constructor(
        private dragulaService: DragulaService,
        private dataService: DataService,
        private playerStateService: PlayerStateService) {

        this.dataService.playlistsList$.subscribe((data) => {
            this.playlistsList = data;
        });

        this.dataService.searchResults$.subscribe((data) => {
            this.searchResults = data;
        });

        this.dataService.onPlayList$.subscribe((data) => {
            this.onPlayList = data;
        });

        this.dataService.appState$.subscribe((data) => {
            this.selectedTab = data.selectedTab;
        });

        this.playerStateService.playerPanelState$.subscribe((data) => {
            this.historicList = data.historiclist;
        });
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.srBag);
        // this.dragulaService.destroy(this.pldBag);
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
                const accept = (el.dataset.plid && target.dataset.plid) && el.dataset.from === 'detail' && target !== source
                    ? !(el.dataset.plid === target.dataset.plid)
                    : true;
                return (target.dataset.acceptdrop === 'true') && accept;
            },
        });


        // Get drake
        this.srDrake = this.dragulaService.find(this.srBag).drake;


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

        if (bagName === this.playerBag) {

        } else if (bagName === this.srBag) {
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

        } else if (bagName === this.srBag) {
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
            /*
            const videoId = el.dataset.videoId;
            const idx = parseInt(el.dataset.index);
            let idddd = 0;

            for (let index = 0; index < target.children.length; index++) {
                const element = target.children[index];
                if (element.dataset.videoId === videoId) {
                    idddd = index;
                    this.move(idx, index);
                }
            }

            console.log('el', el);
            console.log('id', videoId);
            console.log('old index', idx);
            console.log('new index', idddd);
            console.log('target', target);
            console.log('source', source);

            this.dataService.setOnPlayList(this.onPlayList);
            */
        } else if (bagName === this.srBag) {

            let video: PlaylistItem;
            let plSourceIndex: number;
            let plTargetIndex: number;

            // Video to drop from searchresults
            if (el.dataset.from === 'search') {
                video = (<PlaylistItem>_.find(_.union.apply(null, this.searchResults.results), {id: el.dataset.vid}));

            // Video to drop from historicList
            } else if (el.dataset.from === 'historic') {
                video = _.find(this.historicList, {id: el.dataset.vid});

                // Video to drop a playlist
            } else {
                plSourceIndex = _.findIndex(this.playlistsList, {id: el.dataset.plid});
                video = _.find(this.playlistsList[plSourceIndex].videolist, {id: el.dataset.vid});
            }

            // Drop on navbar playlist
            if (target.tagName === 'BUTTON' && target.classList.contains('plDrop')) {
                plTargetIndex = _.findIndex(this.playlistsList, {id: target.dataset.plid});
                this.playlistsList[plTargetIndex].videolist.push(video);

            // Reorder playlist
            } else if (target.tagName === 'DIV' && target.classList.contains('detail') && target === source) {
                plTargetIndex = _.findIndex(this.playlistsList, {id: target.dataset.plid});
                const videoList = this.playlistsList[plTargetIndex].videolist;
                const newVideoList = _.chain(target.children)
                    .map((node: HTMLElement) => node['dataset'].vid)
                    .map((videoId: string) => _.find(videoList, {id: videoId}))
                    .value();
                this.playlistsList[plTargetIndex].videolist = newVideoList;
                this.dataService.setOnSelectPL(this.playlistsList[plTargetIndex]);
            }
            el.remove();
            this.dataService.setPlaylistsList(this.playlistsList);
        }
    }

    private onDropModel(bagName: string, args) {
        const [el, target, source] = args;

        if (bagName === this.playerBag) {
            this.dataService.setOnPlayList(this.onPlayList);
        }
    }

    private onDrag(bagName: string, args) {
        const [el, source] = args;

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
        this.destroyAutoScroll(true);
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

    move(from, to) {
        if (to === from) {
            return;
        }

        const target = this.onPlayList[from];
        const increment = to < from ? -1 : 1;

        for (let k = from; k !== to; k += increment) {
            this.onPlayList[k] = this.onPlayList[k + increment];
        }

        this.onPlayList[to] = target;
        this.dataService.setOnPlayList(this.onPlayList);
    }
}
