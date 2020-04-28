import { Injectable } from '@angular/core';
import { IncomingBatches } from './../model/incoming-batches.model';

import { Adapter } from '@core/adapter';


@Injectable()
export class IncomingAdapter implements Adapter<IncomingBatches>{


    adapt(item : any) : IncomingBatches{

        return new IncomingBatches(
            item.batch_id,
            item.batch_id,
            item.node_id,
            item.channel_id,
            item.status,
            item.error_flag,
            item.sql_state,
            item.sql_code,
            item.sql_message,
            item.last_update_hostname,
            item.last_update_time,
            item.create_time,
            item.summary,
            item.ignore_count,
            item.byte_count,
            item.load_flag,
            item.extract_count,
            item.sent_count,
            item.load_count,
            item.reload_row_count,
            item.other_row_count,
            item.data_row_count,
            item.extract_row_count,
            item.load_row_count,
            item.data_insert_row_count,
            item.data_update_row_count,
            item.data_delete_row_count,
            item.extract_insert_row_count,
            item.extract_update_row_count,
            item.extract_delete_row_count,
            item.load_insert_row_count,
            item.load_update_row_count,
            item.load_delete_row_count,
            item.network_millis,
            item.filter_millis,
            item.load_millis,
            item.router_millis,
            item.extract_millis,
            item.transform_extract_millis,
            item.transform_load_millis,
            item.load_id,
            item.common_flag,
            item.fallback_insert_count,
            item.fallback_update_count,
            item.ignore_row_count,
            item.missing_delete_count,
            item.skip_count,
            item.failed_row_number,
            item.failed_line_number,
            item.failed_data_id
        );
    }

}
