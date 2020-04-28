import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadStepTwoOfTwoComponent } from './data-load-step-two-of-two.component';

describe('DataLoadStepTwoOfTwoComponent', () => {
  let component: DataLoadStepTwoOfTwoComponent;
  let fixture: ComponentFixture<DataLoadStepTwoOfTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadStepTwoOfTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadStepTwoOfTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
