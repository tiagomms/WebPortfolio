import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPageTimelineComponent } from './modal-page-timeline.component';

describe('ModalPageTimelineComponent', () => {
  let component: ModalPageTimelineComponent;
  let fixture: ComponentFixture<ModalPageTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPageTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPageTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
