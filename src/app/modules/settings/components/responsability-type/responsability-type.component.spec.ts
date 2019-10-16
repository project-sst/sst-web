import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabilityTypeComponent } from './responsability-type.component';

describe('ResponsabilityTypeComponent', () => {
  let component: ResponsabilityTypeComponent;
  let fixture: ComponentFixture<ResponsabilityTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsabilityTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsabilityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
