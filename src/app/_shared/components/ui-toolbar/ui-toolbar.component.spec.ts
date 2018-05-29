import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiToolbarComponent } from './ui-toolbar.component';

describe('PlayerBarComponent', () => {
  let component: UiToolbarComponent;
  let fixture: ComponentFixture<UiToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
