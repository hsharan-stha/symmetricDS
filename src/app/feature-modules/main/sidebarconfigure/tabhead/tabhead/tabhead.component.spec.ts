import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabheadComponent } from './tabhead.component';

describe('TabheadComponent', () => {
  let component: TabheadComponent;
  let fixture: ComponentFixture<TabheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
