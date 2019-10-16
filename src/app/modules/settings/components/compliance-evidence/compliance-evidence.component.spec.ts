import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceEvidenceComponent } from './compliance-evidence.component';

describe('ComplianceEvidenceComponent', () => {
  let component: ComplianceEvidenceComponent;
  let fixture: ComponentFixture<ComplianceEvidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceEvidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
