import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubePlayerComponent } from './youtube-player.component';
import { YoutubePlayerService } from './youtube-player.service';
import { YoutubeApiService } from './youtube-api.service';

@NgModule({
  declarations: [
    YoutubePlayerComponent
  ],
  exports: [
    YoutubePlayerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    YoutubePlayerService,
    YoutubeApiService
  ]
})
export class YoutubePlayerModule { }
