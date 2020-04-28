import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWithLoadingComponent } from './select-with-loading.component';

describe('SelectWithLoadingComponent', () => {
  let component: SelectWithLoadingComponent;
  let fixture: ComponentFixture<SelectWithLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWithLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWithLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
