import { ElementRef } from '@angular/core';

export interface AutoScrollConfig {
    container: ElementRef;
    selectedTab: number;
    margin?: number;
    maxSpeed?: number;
    scroll?: any;
}
