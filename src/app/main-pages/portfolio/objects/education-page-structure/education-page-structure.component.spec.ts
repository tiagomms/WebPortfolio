import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationPageStructureComponent } from './education-page-structure.component';

describe('EducationPageStructureComponent', () => {
  let component: EducationPageStructureComponent;
  let fixture: ComponentFixture<EducationPageStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationPageStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationPageStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
