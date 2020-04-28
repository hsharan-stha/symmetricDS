import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadStepOneComponent } from './data-load-step-one.component';

describe('DataLoadStepOneComponent', () => {
  let component: DataLoadStepOneComponent;
  let fixture: ComponentFixture<DataLoadStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
