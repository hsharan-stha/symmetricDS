import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformTableComponent } from './transform-table.component';

describe('TransformTableComponent', () => {
  let component: TransformTableComponent;
  let fixture: ComponentFixture<TransformTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
