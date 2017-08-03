import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomedicalEngineeringComponent } from './biomedical-engineering.component';

describe('BiomedicalEngineeringComponent', () => {
  let component: BiomedicalEngineeringComponent;
  let fixture: ComponentFixture<BiomedicalEngineeringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomedicalEngineeringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomedicalEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
