// Copyright (C) 2017 Gnucoop
// This project is licensed under the terms of the MIT license.
// https://github.com/gnucoop/ng2-dnd

import {Injectable} from '@angular/core';
import {isString} from './ngx-dnd.utils';

export class DataTransferEffect {
    static COPY = new DataTransferEffect('copy');
    static LINK = new DataTransferEffect('link');
    static MOVE = new DataTransferEffect('move');
    static NONE = new DataTransferEffect('none');

    constructor(public name: string) { }
}

export class DragImage {
    constructor(
    public imageElement: any,
    public xOffset?,
    public yOffset?) {
        if (isString(this.imageElement)) {
            const img = new Image();
            img.src = imageElement;
            this.imageElement = img;
        }
        this.xOffset = xOffset || 0;
        this.yOffset = yOffset || 0;
    }
}

@Injectable()
export class DragDropConfig {
    public onDragStartClass = 'dnd-drag-start';
    public onDragEnterClass = 'dnd-drag-enter';
    public onDragOverClass = 'dnd-drag-over';
    public onSortableDragClass = 'dnd-sortable-drag';

    public dragEffect: DataTransferEffect = DataTransferEffect.MOVE;
    public dropEffect: DataTransferEffect = DataTransferEffect.MOVE;
    public dragCursor = 'move';
    public dragImage: DragImage;
}
