import { Injectable } from '@angular/core';
import { Adapter } from '@core/adapter';
import { FormAdapter } from '@core/form.adapter';
import { TransformColumn } from '../model/transform-column.model';
import { TransformColumnForm } from '../model/transform-column-form.model';
import { IncludeOn } from '../data/include-on.data';

@Injectable()
export class TransformColumnAdapter implements  Adapter<TransformColumn>, FormAdapter<TransformColumnForm>{
    

    adapt(item : any){
        let transform = new TransformColumn();
        transform.id    = encodeURI(item.transform_id+":"+item.include_on +":"+item.target_column_name); 
        transform.transform_id = item.transform_id  ; 
        transform.include_on = item.include_on ; 
        transform.target_column_name = item.target_column_name  ; 
        transform.source_column_name = item.source_column_name  ; 
        transform.pk = item.pk  ; 
        transform.transform_type = item.transform_type  ; 
        transform.transform_expression = item.transform_expression  ; 
        transform.transform_order = item.transform_order  ; 
        transform.create_time = item.create_time  ; 
        transform.last_update_by = item.last_update_by  ; 
        transform.last_update_time = item.last_update_time  ; 
        transform.description = item.description  ; 
         
        return transform ; 
        
    }

    formAdapt(item: any): TransformColumnForm {
        let formModel = new TransformColumnForm();
         
        formModel.transform_id          = item.transform_id  ; 
        formModel.include_on            = item.include_on  ; 
        formModel.target_column_name    = item.target_column_name  ; 
        formModel.source_column_name    = item.source_column_name  ; 
        formModel.pk                    = Number(item.pk)  ; 
        formModel.transform_type        = item.transform_type  ; 
        formModel.transform_expression  = item.transform_expression  ; 
        formModel.transform_order       = item.transform_order  ; 
        formModel.create_time           = (item.create_time) ? item.create_time : ""  ; 
        formModel.last_update_by        = (item.last_update_by) ? item.last_update_by : ""  ; 
        formModel.last_update_time      = (item.last_update_time) ? item.last_update_time : ""  ; 
        formModel.description           = item.description  ; 

        return formModel ; 
    }

  

}
