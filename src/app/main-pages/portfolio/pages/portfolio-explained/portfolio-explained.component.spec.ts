import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioExplainedComponent } from './portfolio-explained.component';

describe('PortfolioExplainedComponent', () => {
  let component: PortfolioExplainedComponent;
  let fixture: ComponentFixture<PortfolioExplainedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioExplainedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioExplainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
