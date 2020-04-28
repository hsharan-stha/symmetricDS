import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTriggersComponent } from './file-triggers.component';

describe('FileTriggersComponent', () => {
  let component: FileTriggersComponent;
  let fixture: ComponentFixture<FileTriggersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTriggersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTriggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
