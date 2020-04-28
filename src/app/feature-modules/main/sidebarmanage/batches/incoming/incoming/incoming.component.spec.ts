import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingBatchesComponent } from './incoming-batches.component';

describe('IncomingBatchesComponent', () => {
  let component: IncomingBatchesComponent;
  let fixture: ComponentFixture<IncomingBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
