import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosListComponent } from './videos-list.component';

describe('VideosListComponent', () => {
  let component: VideosListComponent;
  let fixture: ComponentFixture<VideosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
