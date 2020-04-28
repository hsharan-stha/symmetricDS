import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroutingComponent } from './tablerouting.component';

describe('TableroutingComponent', () => {
  let component: TableroutingComponent;
  let fixture: ComponentFixture<TableroutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
