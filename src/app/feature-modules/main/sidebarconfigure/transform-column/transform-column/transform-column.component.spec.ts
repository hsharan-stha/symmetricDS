import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformColumnComponent } from './transform-column.component';

describe('TransformColumnComponent', () => {
  let component: TransformColumnComponent;
  let fixture: ComponentFixture<TransformColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
