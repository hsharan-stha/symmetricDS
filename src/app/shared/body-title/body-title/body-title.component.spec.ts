import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BodyTitleComponent } from './body-title.component';

describe('BodyTitleComponent', () => {
  let component: BodyTitleComponent;
  let fixture: ComponentFixture<BodyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should have text input",()=>{
        component.text = "Test";

        fixture.detectChanges();
        let div = fixture.debugElement.query(By.css(".body-title"));
        expect(div.nativeElement.innerText).toBe("Test");
    });
});
