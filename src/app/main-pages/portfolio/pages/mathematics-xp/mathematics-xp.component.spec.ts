import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathematicsXpComponent } from './mathematics-xp.component';

describe('MathematicsXpComponent', () => {
  let component: MathematicsXpComponent;
  let fixture: ComponentFixture<MathematicsXpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathematicsXpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathematicsXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
