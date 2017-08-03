import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioProjectLinksComponent } from './portfolio-project-links.component';

describe('PortfolioProjectLinksComponent', () => {
  let component: PortfolioProjectLinksComponent;
  let fixture: ComponentFixture<PortfolioProjectLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioProjectLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioProjectLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
