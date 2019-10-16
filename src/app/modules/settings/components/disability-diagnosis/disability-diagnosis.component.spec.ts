import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityDiagnosisComponent } from './disability-diagnosis.component';

describe('DisabilityDiagnosisComponent', () => {
  let component: DisabilityDiagnosisComponent;
  let fixture: ComponentFixture<DisabilityDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
