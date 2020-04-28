import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadStepThreeComponent } from './data-load-step-three.component';

describe('DataLoadStepThreeComponent', () => {
  let component: DataLoadStepThreeComponent;
  let fixture: ComponentFixture<DataLoadStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
