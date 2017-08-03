import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTechnologyComponent } from './education-technology.component';

describe('EducationTechnologyComponent', () => {
  let component: EducationTechnologyComponent;
  let fixture: ComponentFixture<EducationTechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
