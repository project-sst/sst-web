import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceInformationComponent } from './source-information.component';

describe('SourceInformationComponent', () => {
  let component: SourceInformationComponent;
  let fixture: ComponentFixture<SourceInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
