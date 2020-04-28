import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';

import {RouterTypeAdapter} from './../adapter/router-type.adapter';

import {RouterTypeData} from './../data/router-typer.data';

@Injectable()
export class RouterTypeService {

    constructor(
        private http: HttpClient,
        private adapter: RouterTypeAdapter
    ) {
    }


    get() {
        return of(RouterTypeData.get()).pipe(
            map((data: any) => data.map((item: any) => this.adapter.adapt(item)))
        );
    }
}