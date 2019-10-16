import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSystemComponent } from './evaluation-system.component';

describe('EvaluationSystemComponent', () => {
  let component: EvaluationSystemComponent;
  let fixture: ComponentFixture<EvaluationSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
