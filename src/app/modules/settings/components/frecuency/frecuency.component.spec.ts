import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrecuencyComponent } from './frecuency.component';

describe('FrecuencyComponent', () => {
  let component: FrecuencyComponent;
  let fixture: ComponentFixture<FrecuencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrecuencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrecuencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
