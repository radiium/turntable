import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { DataService } from 'core/services/data.service';

@Directive({
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective {

    suggestsBox: any;

    constructor(
    private _elementRef: ElementRef,
    private dataSrv: DataService) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement || targetElement.id === 'menuBtn') {
            return;
        }
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.dataSrv.setSuggestsBox(false);
        }
    }
}
