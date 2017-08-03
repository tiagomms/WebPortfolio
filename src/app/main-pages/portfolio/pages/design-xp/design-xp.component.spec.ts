import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignXpComponent } from './design-xp.component';

describe('DesignXpComponent', () => {
  let component: DesignXpComponent;
  let fixture: ComponentFixture<DesignXpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignXpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
