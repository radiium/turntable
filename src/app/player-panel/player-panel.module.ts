import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { PlayerComponent } from './player/player.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        PlayerComponent
    ],
    declarations: [
        PlayerComponent
    ]
})
export class PlayerPanelModule { }
