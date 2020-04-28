import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadStepTwoComponent } from './data-load-step-two.component';

describe('DataLoadStepTwoComponent', () => {
  let component: DataLoadStepTwoComponent;
  let fixture: ComponentFixture<DataLoadStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
