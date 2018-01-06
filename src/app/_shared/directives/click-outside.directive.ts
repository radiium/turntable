import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective {

    constructor(
        private _elementRef: ElementRef) {}

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        console.log('event', event);
        console.log('targetElement', targetElement);
        if (!targetElement || targetElement.id === 'menuBtn') {
            return;
        }

        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}
