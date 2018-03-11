import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { PlayerComponent } from './player/player.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { PlayerControlComponent } from './player-control/player-control.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        PlayerComponent,
        PlayerPanelComponent,
        RangeSliderComponent
    ],
    declarations: [
        PlayerComponent,
        PlayerPanelComponent,
        RangeSliderComponent,
        PlayerControlComponent
    ]
})
export class PlayerPanelModule { }
