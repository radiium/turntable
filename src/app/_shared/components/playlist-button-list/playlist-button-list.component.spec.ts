import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistButtonListComponent } from './playlist-button-list.component';

describe('PlaylistButtonListComponent', () => {
  let component: PlaylistButtonListComponent;
  let fixture: ComponentFixture<PlaylistButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistButtonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
