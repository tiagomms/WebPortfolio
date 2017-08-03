import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenEventsOnTimelineComponent } from './written-events-on-timeline.component';

describe('WrittenEventsOnTimelineComponent', () => {
  let component: WrittenEventsOnTimelineComponent;
  let fixture: ComponentFixture<WrittenEventsOnTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrittenEventsOnTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrittenEventsOnTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
