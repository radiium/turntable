import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { LibraryComponent } from './library/library.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    LibraryComponent
  ],
  declarations: [
    LibraryComponent
  ]
})
export class LibraryPanelModule { }
