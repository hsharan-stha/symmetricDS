import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLinksComponent } from './group-links.component';

describe('GroupLinksComponent', () => {
  let component: GroupLinksComponent;
  let fixture: ComponentFixture<GroupLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
