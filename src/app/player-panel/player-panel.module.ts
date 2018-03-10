import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { PlayerComponent } from './player/player.component';
import { PlayerPanelComponent } from './player-panel/player-panel.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        PlayerComponent,
        PlayerPanelComponent
    ],
    declarations: [
        PlayerComponent,
        PlayerPanelComponent
    ]
})
export class PlayerPanelModule { }
