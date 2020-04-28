import { Injectable } from '@angular/core';

import { Parameters } from './../model/parameters.model';
import { ParametersForm } from './../model/parameters.form.model';

import { Adapter } from '@core/adapter';
import { FormAdapter } from '@core/form.adapter';

@Injectable()
export class ParametersAdapter implements Adapter<Parameters>, FormAdapter<ParametersForm>{


    adapt(item : any) : Parameters{
        let id = encodeURI(item.external_id+":"+item.node_group_id+":"+item.param_key);
        return new Parameters(
            encodeURI(item.external_id+":"+item.node_group_id+":"+item.param_key),
            item.external_id,
            item.node_group_id,
            item.param_key,
            //"<a [routerLink]="+id+">Edit</a>",
            item.param_value,
            item.create_time,
            item.last_update_by,
            item.last_update_time
        )
    }

    formAdapt(item : any) : ParametersForm{
       return new ParametersForm(
           item.external_id,
           item.node_group_id,
           item.param_key,
           item.param_value,
           null,
           null,
           null
       )
    }
}
