import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiofeedbackProjectComponent } from './biofeedback-project.component';

describe('BiofeedbackProjectComponent', () => {
  let component: BiofeedbackProjectComponent;
  let fixture: ComponentFixture<BiofeedbackProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiofeedbackProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiofeedbackProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
