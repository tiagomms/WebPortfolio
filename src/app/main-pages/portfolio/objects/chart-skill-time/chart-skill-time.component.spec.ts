import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSkillTimeComponent } from './chart-skill-time.component';

describe('ChartSkillTimeComponent', () => {
  let component: ChartSkillTimeComponent;
  let fixture: ComponentFixture<ChartSkillTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSkillTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSkillTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
