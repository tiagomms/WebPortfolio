import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProjectPageComponent } from './portfolio-project-page.component';

describe('PortfolioProjectPageComponent', () => {
  let component: PortfolioProjectPageComponent;
  let fixture: ComponentFixture<PortfolioProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
