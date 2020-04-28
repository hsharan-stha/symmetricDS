import { Injectable } from '@angular/core';
import { Adapter } from '@core/adapter'; 
import { TransformType } from '../model/transform-type.model';

 
@Injectable()
export class TransformTypeAdapter implements  Adapter<TransformType>{

    adapt(item : any){
        let type = new TransformType();
        type.code    = item.code ; 
        type.name   = item.name ; 
        return type ; 
    }
}
