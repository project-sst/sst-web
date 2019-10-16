import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryTypeComponent } from './injury-type.component';

describe('InjuryTypeComponent', () => {
  let component: InjuryTypeComponent;
  let fixture: ComponentFixture<InjuryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjuryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjuryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
