import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListItemComponent } from './video-list-item.component';

describe('VideoListItemComponent', () => {
  let component: VideoListItemComponent;
  let fixture: ComponentFixture<VideoListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
