import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixPanelComponent } from './mix-panel.component';

describe('MixPageComponent', () => {
  let component: MixPanelComponent;
  let fixture: ComponentFixture<MixPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
