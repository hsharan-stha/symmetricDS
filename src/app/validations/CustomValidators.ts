import { AbstractControl } from '@angular/forms';


export class CustomValidators{

    static passwordMatch(control : AbstractControl) : { [ key : string ] : boolean }{

        const password = control.get('password');
        const confirmPassword = control.get("confirm_password");

        // if form control doesn't exists
        if(!password || !confirmPassword)
            return null ;

        // if they are equal
        if(password.value == confirmPassword.value)
            return null ;

        return {
            mismatch : true
        };
    }
}