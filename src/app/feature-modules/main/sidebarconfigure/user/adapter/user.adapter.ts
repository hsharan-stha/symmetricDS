
import { Injectable } from '@angular/core';

import { User } from './../model/user.model';
import { UserForm } from "./../model/user.form.model"

import { Adapter } from '@core/adapter';
import { FormAdapter } from '@core/form.adapter';

import { Roles } from './../data/role.data';


@Injectable()
export class UserAdapter implements Adapter<User>,FormAdapter<UserForm>{

    adapt(item : any) : User{

        return new User(
            item.username ,
            item.username ,
            item.password ,
            item.first_name ,
            item.last_name ,
            item.role_id
        );
    }

    formAdapt(item : any) : UserForm{
        return new UserForm(
            item.username ,
            (item.password)? item.password : '' ,
            item.first_name ,
            item.last_name ,
            item.role_id
        );
    }
}