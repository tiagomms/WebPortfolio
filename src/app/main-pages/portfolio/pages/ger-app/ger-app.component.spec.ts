import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerAppComponent } from './ger-app.component';

describe('GerAppComponent', () => {
  let component: GerAppComponent;
  let fixture: ComponentFixture<GerAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
