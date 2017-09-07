import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { DragulaModule } from 'ng2-dragula';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
// import { SharedModule } from './_shared/shared.module';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { VideoService } from './_shared/_services/video.service';
import { VideoStateService } from './_shared/_services/video-state.service';
import { VideosListComponent } from './videos-list/videos-list.component';
import { VideosListItemComponent } from './videos-list-item/videos-list-item.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

import { DurationPipe } from './_shared/_pipes/duration.pipe';
import { RangeSliderComponent } from './range-slider/range-slider.component';

@NgModule({
  declarations: [
      AppComponent,
      SearchBarComponent,
      VideosListComponent,
      VideosListItemComponent,
      VideoPlayerComponent,
      DurationPipe,
      RangeSliderComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      JsonpModule,
      DragulaModule,
      YoutubePlayerModule,
      Angular2FontawesomeModule
      // SharedModule
  ],
  providers: [
      VideoService,
      VideoStateService,
      DurationPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
