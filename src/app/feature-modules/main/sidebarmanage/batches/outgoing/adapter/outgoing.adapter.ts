import { Injectable } from '@angular/core';
import { Outgoing } from './../model/outgoing.model';

import { Adapter } from '@core/adapter';


@Injectable()
export class OutgoingAdapter implements Adapter<Outgoing>{


    adapt(item : any) : Outgoing{

        return new Outgoing(
            item.batch_id ,
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
            item.total_extract_millis,
            item.total_load_millis,
            item.extract_job_flag,
            item.extract_start_time,
            item.transfer_start_time,
            item.load_start_time,
            item.failed_data_id,
            item.failed_line_number,
            item.create_by
        );
    }

}