import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Roles } from './../data/role.data';
import { RoleAdapter } from "./../adapter/role.adapter";

@Injectable()
export class RoleService {

    constructor(
        private adapter : RoleAdapter
    ) { }

    /**
     * Get a list of roles
     * @returns {any|Observable<T>|Observable<A>|Observable<B>|Observable<C>|Observable<D>}
     */
    get() {
        return of(Roles.get()).pipe(
            map((data)=>data.map((item)=>this.adapter.adapt(item)))
        );
    }
}
