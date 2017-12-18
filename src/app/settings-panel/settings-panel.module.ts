import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SettingsComponent
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsPanelModule { }
