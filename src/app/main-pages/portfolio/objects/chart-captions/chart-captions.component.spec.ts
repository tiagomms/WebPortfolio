import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCaptionsComponent } from './chart-captions.component';

describe('ChartCaptionsComponent', () => {
  let component: ChartCaptionsComponent;
  let fixture: ComponentFixture<ChartCaptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCaptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCaptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
