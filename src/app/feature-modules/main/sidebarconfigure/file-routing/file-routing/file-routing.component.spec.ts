import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileRoutingComponent } from './file-routing.component';

describe('FileRoutingComponent', () => {
  let component: FileRoutingComponent;
  let fixture: ComponentFixture<FileRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
