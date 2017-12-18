import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
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
