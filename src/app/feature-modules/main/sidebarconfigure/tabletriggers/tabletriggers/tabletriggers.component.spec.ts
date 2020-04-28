import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletriggersComponent } from './tabletriggers.component';

describe('TabletriggersComponent', () => {
  let component: TabletriggersComponent;
  let fixture: ComponentFixture<TabletriggersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletriggersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletriggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
