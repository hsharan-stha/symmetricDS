import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarconfigureComponent } from './sidebarconfigure.component';

describe('SidebarconfigureComponent', () => {
  let component: SidebarconfigureComponent;
  let fixture: ComponentFixture<SidebarconfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarconfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarconfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
