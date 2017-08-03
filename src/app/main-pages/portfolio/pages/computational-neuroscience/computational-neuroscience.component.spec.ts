import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputationalNeuroscienceComponent } from './computational-neuroscience.component';

describe('ComputationalNeuroscienceComponent', () => {
  let component: ComputationalNeuroscienceComponent;
  let fixture: ComponentFixture<ComputationalNeuroscienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputationalNeuroscienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputationalNeuroscienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
