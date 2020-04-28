import { Injectable } from '@angular/core';

import { FormAdapter } from '@core/form.adapter';
import { FilterFormStatus } from './../model/filter.model';


@Injectable()
export class FilterFormAdapter implements  FormAdapter<FilterFormStatus>{

    formAdapt(item : any) : FilterFormStatus{
        return new FilterFormStatus(
            (item.channel_id == "<Any>") ? "": item.channel_id,
            item.status
        )
    }
}