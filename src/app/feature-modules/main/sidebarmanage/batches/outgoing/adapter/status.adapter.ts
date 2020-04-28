import { Injectable } from '@angular/core';

import { Adapter } from '@core/adapter';
import { Status } from './../model/status.model';

@Injectable()
export class StatusAdapter implements Adapter<Status>{

    adapt(data) : Status{
         
        return new Status(
            data.code,
            data.name
        )
    }
}