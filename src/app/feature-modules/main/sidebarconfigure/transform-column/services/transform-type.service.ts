import { Injectable } from '@angular/core';
import { TransformTypeData } from '../data/transform-type.data';
import { of, Observable } from 'rxjs';
import { TransformTypeAdapter } from '../adapter/transform-type.adapter';
import { map } from 'rxjs/operators';
import { TransformType } from '../model/transform-type.model';
 

@Injectable()
export class TransformTypeService {

    constructor(
        private adapter : TransformTypeAdapter
    ) { }

    get() : Observable<TransformType[]>{
        return of(TransformTypeData).pipe(
            map((data)=>data.map((item)=>this.adapter.adapt(item)))
        );
    }
}
