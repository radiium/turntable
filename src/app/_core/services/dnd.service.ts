import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import * as _ from 'lodash';

import { User, Playlist, Video, Suggests, SearchResults } from 'core/models';

@Injectable()
export class DndService implements OnInit, OnDestroy {

    searchResultsBag = 'searchResults';
    playlistDetailsBag = 'playlistDetails';

    constructor(
    private dragulaService: DragulaService) {

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    initDnd() {
        const that = this;
        this.dragulaService.setOptions(
            this.playlistDetailsBag, {
            // revertOnSpill: true,
            removeOnSpill: true
            /*
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true';
            },
            copy: (el, source): boolean => {
                return source.dataset.acceptDrop === 'false';
            },
            accepts: (el, target, source, sibling): boolean => {

                // Prevent duplicate
                let accept = true;
                if (source !== target) {
                    that.videolist.forEach(video => {
                        if (el.dataset.id === video.id) {
                            accept = false;
                        }
                    });
                }
                return (accept && target.dataset.acceptDrop === 'true');
            },
            */
        });


        console.log('coucou');
        this.dragulaService.setOptions(
            this.searchResultsBag, {
            // revertOnSpill: true,
            removeOnSpill: true,
            moves: function (el, container, handle) {
                console.log('el', el);
                console.log('container', container);
                console.log('handle', handle);
                return handle.className === 'handle';
              }
            /*
            moves: (el, source, handle, sibling): boolean => {
                return el.dataset.movable === 'true';
            },
            copy: (el, source): boolean => {
                return source.dataset.acceptDrop === 'false';
            },
            accepts: (el, target, source, sibling): boolean => {

                // Prevent duplicate
                let accept = true;
                if (source !== target) {
                    that.videolist.forEach(video => {
                        if (el.dataset.id === video.id) {
                            accept = false;
                        }
                    });
                }
                return (accept && target.dataset.acceptDrop === 'true');
            },
            */
        });
    }
}
