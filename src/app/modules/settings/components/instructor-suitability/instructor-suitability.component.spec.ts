import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSuitabilityComponent } from './instructor-suitability.component';

describe('InstructorSuitabilityComponent', () => {
  let component: InstructorSuitabilityComponent;
  let fixture: ComponentFixture<InstructorSuitabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorSuitabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorSuitabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
