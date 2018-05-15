import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {

    tooltip: any;
    elemPosition: any;
    tooltipOffset: number;
    hideTimeoutId: number;
    showTimeoutId: number;

    @Input() text = '';
    @Input() placement = 'top';
    @Input() delay = 0;
    @Input() showDelay = 0;
    @Input() hideDelay = 300;
    @Input() zIndex = false;

    constructor(private elementRef: ElementRef) {
        this.tooltipOffset = 8;
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    @HostListener('mousemove')
    onMouseEnter() {
        this.getElemPosition();

        if (!this.tooltip) {
            this.create();
            this.setPosition();
            this.show();
        }
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    @HostListener ('mousedown')
    onMouseLeave() {
        this.hide();
    }

    getElemPosition() {
        this.elemPosition = this.elementRef.nativeElement.getBoundingClientRect();
    }

    create() {
        this.showDelay = this.delay || this.showDelay;
        this.tooltip = document.createElement('span');
        this.tooltip.className += 'ng-tooltip ng-tooltip-' + this.placement;
        this.tooltip.textContent = this.text;
        if (this.zIndex) {
            this.tooltip.style.zIndex = this.zIndex;
        }

        document.body.appendChild(this.tooltip);
    }

    show() {
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
        }

        this.showDelay = this.delay || this.showDelay;
        this.showTimeoutId = window.setTimeout(() => {
            if (this.tooltip) {
                this.tooltip.className += ' ng-tooltip-show';
            }
        }, this.showDelay);
    }

    hide() {
        clearTimeout(this.showTimeoutId);

        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
        }

        if (this.tooltip) {
            this.tooltip.classList.remove('ng-tooltip-show');
            this.hideTimeoutId = window.setTimeout(() => {
               this.tooltip.parentNode.removeChild(this.tooltip);
               this.tooltip = null;
            }, this.hideDelay);
        }
    }

    setPosition() {
        const elemHeight = this.elementRef.nativeElement.offsetHeight;
        const elemWidth = this.elementRef.nativeElement.offsetWidth;
        const tooltipHeight = this.tooltip.clientHeight;
        const tooltipWidth = this.tooltip.offsetWidth;
        const scrollY = window.pageYOffset;

        if (this.placement === 'top') {
            this.tooltip.style.top = (this.elemPosition.top + scrollY) - (tooltipHeight + this.tooltipOffset) + 'px';
        }

        if (this.placement === 'bottom') {
            this.tooltip.style.top = (this.elemPosition.top + scrollY) + elemHeight + this.tooltipOffset + 'px';
        }

        if (this.placement === 'top' || this.placement === 'bottom') {
            this.tooltip.style.left = (this.elemPosition.left + elemWidth / 2) - tooltipWidth / 2 + 'px';
        }

        if (this.placement === 'left') {
            this.tooltip.style.left = this.elemPosition.left - tooltipWidth - this.tooltipOffset + 'px';
        }

        if (this.placement === 'right') {
            this.tooltip.style.left = this.elemPosition.left + elemWidth + this.tooltipOffset + 'px';
        }

        if (this.placement === 'left' || this.placement === 'right') {
            this.tooltip.style.top = (this.elemPosition.top + scrollY) + elemHeight / 2 - this.tooltip.clientHeight / 2 + 'px';
        }
    }
}
