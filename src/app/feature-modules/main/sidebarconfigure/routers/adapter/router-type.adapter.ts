import { Injectable } from '@angular/core';
import { Adapter } from '@core/adapter';
import { RouterType } from './../model/router-type.model';

@Injectable()
export class RouterTypeAdapter implements  Adapter<RouterType>{

    adapt(item : any){
        return new RouterType(
            item
        )
    }
}