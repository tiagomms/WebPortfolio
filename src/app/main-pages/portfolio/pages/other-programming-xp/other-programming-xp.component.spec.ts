import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProgrammingXpComponent } from './other-programming-xp.component';

describe('OtherProgrammingXpComponent', () => {
  let component: OtherProgrammingXpComponent;
  let fixture: ComponentFixture<OtherProgrammingXpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherProgrammingXpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProgrammingXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
