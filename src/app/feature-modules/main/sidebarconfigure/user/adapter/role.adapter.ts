import { Injectable } from '@angular/core';

import { Role } from './../model/role.model';
import { Adapter } from '@core/adapter';

@Injectable()
export class RoleAdapter implements Adapter<Role>{


    adapt(item : any) : Role{

        return new Role(
            item.id ,
            item.name
        )
    }

}