import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioHeaderLinkComponent } from './portfolio-header-link.component';

describe('PortfolioHeaderLinkComponent', () => {
  let component: PortfolioHeaderLinkComponent;
  let fixture: ComponentFixture<PortfolioHeaderLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioHeaderLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioHeaderLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
