import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerConsciousnessComponent } from './inner-consciousness.component';

describe('InnerConsciousnessComponent', () => {
  let component: InnerConsciousnessComponent;
  let fixture: ComponentFixture<InnerConsciousnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerConsciousnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerConsciousnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
