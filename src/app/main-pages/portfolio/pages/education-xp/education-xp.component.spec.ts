import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationXpComponent } from './education-xp.component';

describe('EducationXpComponent', () => {
  let component: EducationXpComponent;
  let fixture: ComponentFixture<EducationXpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationXpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
