import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadDialogComponent } from './data-load-dialog.component';

describe('DataLoadDialogComponent', () => {
  let component: DataLoadDialogComponent;
  let fixture: ComponentFixture<DataLoadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
