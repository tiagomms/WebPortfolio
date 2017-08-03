import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSkillsComponent } from './detailed-skills.component';

describe('DetailedSkillsComponent', () => {
  let component: DetailedSkillsComponent;
  let fixture: ComponentFixture<DetailedSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
