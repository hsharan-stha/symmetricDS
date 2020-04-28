import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { LogoModule } from '@shared/logo/logo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NodeService } from './../services/node.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let nodeService : NodeService ;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports : [ LogoModule,FormsModule, ReactiveFormsModule,HttpClientTestingModule ],
            providers : [ NodeService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        nodeService = TestBed.get(NodeService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("form invalid when empty",()=>{
         expect(component.loginForm.valid).toBeFalsy();
    });

    it("username form validity",()=>{
        let username = component.loginForm.controls["username"];
        expect(username.valid).toBeFalsy();

        let errors = {};
        errors = username.errors;
        expect(errors["required"]).toBeTruthy();

        username.setValue("test");
        errors = username.errors || {};
        expect(errors["required"]).toBeFalsy();
    });

    it("password form validity",()=>{
        let password = component.loginForm.controls["password"];
        expect(password.valid).toBeFalsy();

        let errors = {};
        errors = password.errors;
        expect(errors["required"]).toBeTruthy();

        password.setValue("test");
        errors = password.errors || {} ;
        expect(errors["required"]).toBeFalsy();
    });

    it("should have server in default value of node",()=>{
        let option = fixture.debugElement.query(By.css("#node"));
        console.log(option);
        fixture.detectChanges();
        fixture.whenStable().then(()=>{
            expect(option.nativeElement.value).toBe('1');
        });

    });

    it("loginForm should be valid",()=>{
        component.loginForm.get("username").setValue("test");
        component.loginForm.get("password").setValue("test");

        expect(component.loginForm.valid).toBeTruthy();

        component.onSubmit();

        expect(component.submitted).toBeTruthy();

    });


});
