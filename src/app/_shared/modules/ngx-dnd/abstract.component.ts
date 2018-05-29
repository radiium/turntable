// Copyright (C) 2017 Gnucoop
// This project is licensed under the terms of the MIT license.
// https://github.com/gnucoop/ng2-dnd

import {Injectable, ChangeDetectorRef, ElementRef, ViewRef, OnInit, NgZone, Input, HostListener, OnDestroy} from '@angular/core';

import {DragDropConfig, DragImage} from './ngx-dnd.config';
import {DragDropService} from './ngx-dnd.service';
import {isString, isFunction, isPresent, createImage, callFun} from './ngx-dnd.utils';

@Injectable()
export abstract class AbstractComponent implements OnInit, OnDestroy {


    _elem: HTMLElement;
    _dragHandle: HTMLElement;
    _dragHelper: any; // HTMLElement;
    _defaultCursor: string;

    /**
     * Last element that was mousedown'ed
     */
    _target: EventTarget;

    /**
     * Whether the object is draggable. Default is true.
     */
    private _dragEnabled = false;
    set dragEnabled(enabled: boolean) {
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
    }
    get dragEnabled(): boolean {
        return this._dragEnabled;
    }

    /**
     * Allows drop on this element
     */
    dropEnabled = false;
    /**
     * Drag effect
     */
    effectAllowed: string;
    /**
     * Drag cursor
     */
    effectCursor: string;

    /**
     * Restrict places where a draggable element can be dropped. Either one of
     * these two mechanisms can be used:
     *
     * - dropZones: an array of strings that permits to specify the drop zones
     *   associated with this component. By default, if the drop-zones attribute
     *   is not specified, the droppable component accepts drop operations by
     *   all the draggable components that do not specify the allowed-drop-zones
     *
     * - allowDrop: a boolean function for droppable components, that is checked
     *   when an item is dragged. The function is passed the dragData of this
     *   item.
     *   - if it returns true, the item can be dropped in this component
     *   - if it returns false, the item cannot be dropped here
     */
    allowDrop: (dropData: any, id?: string) => boolean;
    dropZones: string[] = [];

    @Input() dragImage: string | DragImage | Function;

    cloneItem = true;

    constructor(
    elemRef: ElementRef,
    public _dragDropService: DragDropService,
    public _config: DragDropConfig,
    private _cdr: ChangeDetectorRef,
    public ngZone: NgZone) {
        this._elem = elemRef.nativeElement;
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this._elem.addEventListener('mousedown', this._onMouseDown.bind(this));
            this._elem.addEventListener('dragstart', this._onDragStart.bind(this));
            this._elem.addEventListener('dragend', this._onDragEnd.bind(this));
            this._elem.addEventListener('dragover', this._onDragOver.bind(this));
            this._elem.addEventListener('dragleave', this._onDragLeave.bind(this));
            this._elem.addEventListener('dragenter', this._onDragEnter.bind(this));
            this._elem.addEventListener('drop', this._onDrop.bind(this));
        });
    }

    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            this._elem.removeEventListener('mousedown', this._onMouseDown.bind(this));
            this._elem.removeEventListener('dragstart', this._onDragStart.bind(this));
            this._elem.removeEventListener('dragend', this._onDragEnd.bind(this));
            this._elem.removeEventListener('dragover', this._onDragOver.bind(this));
            this._elem.removeEventListener('dragleave', this._onDragLeave.bind(this));
            this._elem.removeEventListener('dragenter', this._onDragEnter.bind(this));
            this._elem.removeEventListener('drop', this._onDrop.bind(this));
        });
    }

    /**
     * EVENTS
     */

    _onMouseDown(event) {
        this._target = event.target;
    }

    _onDragStart(event) {
        if (this._dragHandle) {
            if (!this._dragHandle.contains(<Element>this._target)) {
                event.preventDefault();
                return;
            }
        }

        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            this._onDragStartCallback(event);
        }

        if (event.dataTransfer != null) {
            event.dataTransfer.setData('text', JSON.stringify(this._dragDropService.dragData));
            event.dataTransfer.effectAllowed = this.effectAllowed || this._config.dragEffect.name;

            if (this.dragImage) {
                let img, x, y;
                if (this.dragImage instanceof DragImage) {
                    img = this.dragImage.imageElement;
                    x = this.dragImage.xOffset;
                    y = this.dragImage.yOffset;

                } else if (isString(this.dragImage)) {
                    img = new Image();
                    img.src = <string>this.dragImage;
                    x = 0;
                    y = 0;
                } else {
                    // TODO add default
                }
                img.style.cursor = 'move';
                event.dataTransfer.setDragImage(img, x, y);
            }

            // Change drag cursor
            const cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;

            /*
            if (this._dragEnabled) {
                cursorelem.style.cursor = this.effectCursor ? this.effectCursor : this._config.dragCursor;
            } else {
                cursorelem.style.cursor = this._defaultCursor;
            }
            */
           cursorelem.style.cursor = 'move';
        }
    }

    _onDragEnd(event) {
        if (this._elem.parentElement && this._dragHelper) {
            // this._elem.parentElement.removeChild(this._dragHelper);
        }

        this._dragDropService.allowedDropZones = [];
        this._onDragEndCallback(event);

        // Restore style of dragged element
        const cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;
        cursorelem.style.cursor = this._defaultCursor;
    }

    _onDragOver(event) {
        if (event.dataTransfer != null) {
            event.dataTransfer.dropEffect = 'move'; // this._config.dropEffect.name;
        }

        if (this._isDropAllowed) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            this._onDragOverCallback(event);
        }


        return false;
    }

    _onDragLeave(event) {
        if (this._isDropAllowed) {
            this._onDragLeaveCallback(event);
        }
    }

    _onDragEnter(event) {
        if (this._isDropAllowed) {
            // event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }

    _onDrop(event) {
        if (this._isDropAllowed) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            this._onDropCallback(event);
            // this.detectChanges();
        }
    }


    // **** Drop Callbacks **** //

    _onDragEnterCallback(event: Event) { }
    _onDragOverCallback(event: Event) { }
    _onDragLeaveCallback(event: Event) { }
    _onDropCallback(event: Event) { }


    // **** Drag Callbacks **** //

    _onDragStartCallback(event: Event) { }
    _onDragEndCallback(event: Event) { }


    /******* Change detection ******/

    detectChanges() {
        // Programmatically run change detection to fix issue in Safari
        /*
        setTimeout(() => {
            if (this._cdr) {
                const destroyed = (<ViewRef>(<any>this._cdr)).destroyed;
                if (!destroyed) {
                    this._cdr.detectChanges();
                }
            }
        }, 250);
        */
    }

    public setDragHandle(elem: HTMLElement) {
        this._dragHandle = elem;
    }

    private get _isDropAllowed(): boolean {
        if (this._dragDropService.isDragged && this.dropEnabled) {
            // First, if `allowDrop` is set, call it to determine whether the
            // dragged element can be dropped here.
            if (this.allowDrop) {
                return this.allowDrop(this._dragDropService.dragData);
            }

            // Otherwise, use dropZones if they are set.
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                const dragZone: string = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }


}

export class AbstractHandleComponent {

    _elem: HTMLElement;
    set component(component: AbstractComponent) {
        component.setDragHandle(this._elem);
    }

    constructor(
    elemRef: ElementRef,
    public _dragDropService: DragDropService,
    public _config: DragDropConfig,
    private _cdr: ChangeDetectorRef) {
        this._elem = elemRef.nativeElement;
    }
}
