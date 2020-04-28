import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeButtonBarComponent } from './node-button-bar.component';

describe('NodeButtonBarComponent', () => {
  let component: NodeButtonBarComponent;
  let fixture: ComponentFixture<NodeButtonBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeButtonBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
