// Copyright (C) 2017 Gnucoop
// This project is licensed under the terms of the MIT license.
// https://github.com/gnucoop/ng2-dnd

import { NgModule, ModuleWithProviders } from '@angular/core';

import { DragDropService,
    DragDropSortableService,
    dragDropServiceFactory,
    dragDropSortableServiceFactory } from './ngx-dnd.service';
import { DragDropConfig } from './ngx-dnd.config';
import { DraggableComponentDirective, DraggableHandleComponentDirective } from './draggable.component';
import { DroppableComponentDirective } from './droppable.component';
import { SortableContainerDirective, SortableComponentDirective, SortableHandleComponentDirective } from './sortable.component';

export let providers = [
    DragDropConfig,
    {
        provide: DragDropService,
        useFactory: dragDropServiceFactory
    },
    {
        provide: DragDropSortableService,
        useFactory: dragDropSortableServiceFactory,
        deps: [DragDropConfig]
    }
];

@NgModule({
    declarations: [
        DraggableComponentDirective,
        DraggableHandleComponentDirective,
        DroppableComponentDirective,
        SortableContainerDirective,
        SortableComponentDirective,
        SortableHandleComponentDirective
    ],
    exports: [
        DraggableComponentDirective,
        DraggableHandleComponentDirective,
        DroppableComponentDirective,
        SortableContainerDirective,
        SortableComponentDirective,
        SortableHandleComponentDirective
    ]
})
export class NgxDndModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxDndModule,
            providers: providers
        };
    }
}
