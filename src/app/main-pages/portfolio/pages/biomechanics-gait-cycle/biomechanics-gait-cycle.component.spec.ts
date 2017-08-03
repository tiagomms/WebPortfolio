import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomechanicsGaitCycleComponent } from './biomechanics-gait-cycle.component';

describe('BiomechanicsGaitCycleComponent', () => {
  let component: BiomechanicsGaitCycleComponent;
  let fixture: ComponentFixture<BiomechanicsGaitCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomechanicsGaitCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomechanicsGaitCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
