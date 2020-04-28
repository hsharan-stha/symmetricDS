import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingBatchesComponent } from './outgoing-batches.component';

describe('OutgoingBatchesComponent', () => {
  let component: OutgoingBatchesComponent;
  let fixture: ComponentFixture<OutgoingBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
