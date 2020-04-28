import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

import { StatusAdapter } from './../adapter/status.adapter';
import { StatusData } from './../data/status.data';

@Injectable( )
export class StatusService {

    constructor(
        private adapter : StatusAdapter
    ) { }

    getList(){
        return of(StatusData).pipe(
            map((data)=>data.map((item)=>this.adapter.adapt(item)))
        );
    }


}
