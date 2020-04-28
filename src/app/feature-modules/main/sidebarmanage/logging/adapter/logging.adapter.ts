import { Injectable } from '@angular/core';

import { LoggingFilterform } from './../model/logging-filter.form.model';
import { Logging } from './../model/logging.model';
import { Adapter } from '@core/adapter';
import { FormAdapter } from '@core/form.adapter';

@Injectable()
export class LoggingAdapter implements Adapter<Logging>,FormAdapter<LoggingFilterform>{

    adapt(item : any) : Logging{
        return new Logging(
           item
        );
    }

    formAdapt(item : any) : LoggingFilterform{
        return new LoggingFilterform(
            item.qty,
            item.filters
        );
    }


}