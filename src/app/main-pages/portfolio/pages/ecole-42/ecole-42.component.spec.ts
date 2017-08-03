import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecole42Component } from './ecole-42.component';

describe('Ecole42Component', () => {
  let component: Ecole42Component;
  let fixture: ComponentFixture<Ecole42Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ecole42Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecole42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
