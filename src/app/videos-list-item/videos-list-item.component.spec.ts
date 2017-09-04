import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosListItemComponent } from './videos-list-item.component';

describe('VideosListItemComponent', () => {
  let component: VideosListItemComponent;
  let fixture: ComponentFixture<VideosListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
