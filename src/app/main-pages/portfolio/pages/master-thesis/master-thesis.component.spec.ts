import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterThesisComponent } from './master-thesis.component';

describe('MasterThesisComponent', () => {
  let component: MasterThesisComponent;
  let fixture: ComponentFixture<MasterThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
