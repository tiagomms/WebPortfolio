import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastagusComponent } from './gastagus.component';

describe('GastagusComponent', () => {
  let component: GastagusComponent;
  let fixture: ComponentFixture<GastagusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastagusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastagusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
