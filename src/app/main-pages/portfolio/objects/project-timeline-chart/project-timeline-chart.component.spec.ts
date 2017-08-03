import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimelineChartComponent } from './project-timeline-chart.component';

describe('ProjectTimelineChartComponent', () => {
  let component: ProjectTimelineChartComponent;
  let fixture: ComponentFixture<ProjectTimelineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTimelineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTimelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
