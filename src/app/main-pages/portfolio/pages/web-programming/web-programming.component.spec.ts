import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProgrammingComponent } from './web-programming.component';

describe('WebProgrammingComponent', () => {
  let component: WebProgrammingComponent;
  let fixture: ComponentFixture<WebProgrammingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebProgrammingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
