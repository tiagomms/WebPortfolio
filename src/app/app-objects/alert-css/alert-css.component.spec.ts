import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCssComponent } from './alert-css.component';

describe('AlertCssComponent', () => {
  let component: AlertCssComponent;
  let fixture: ComponentFixture<AlertCssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
