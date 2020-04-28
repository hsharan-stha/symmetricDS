import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmanageComponent } from './sidebarmanage.component';

describe('SidebarmanageComponent', () => {
  let component: SidebarmanageComponent;
  let fixture: ComponentFixture<SidebarmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
