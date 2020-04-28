import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledTriggerComponent } from './installed-trigger.component';

describe('InstalledTriggerComponent', () => {
  let component: InstalledTriggerComponent;
  let fixture: ComponentFixture<InstalledTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalledTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalledTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
