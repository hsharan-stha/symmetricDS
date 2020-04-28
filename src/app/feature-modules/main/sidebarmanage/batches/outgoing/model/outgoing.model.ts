
export class Outgoing{

    constructor(
            public id ,
            public batch_id,
            public node_id,
            public channel_id,
            public status,
            public error_flag,
            public sql_state,
            public sql_code,
            public sql_message,
            public last_update_hostname,
            public last_update_time,
            public create_time,
            public summary,
            public ignore_count,
            public byte_count,
            public load_flag,
            public extract_count,
            public sent_count,
            public load_count,
            public reload_row_count,
            public other_row_count,
            public data_row_count,
            public extract_row_count,
            public load_row_count,
            public data_insert_row_count,
            public data_update_row_count,
            public data_delete_row_count,
            public extract_insert_row_count,
            public extract_update_row_count,
            public extract_delete_row_count,
            public load_insert_row_count,
            public load_update_row_count,
            public load_delete_row_count,
            public network_millis,
            public filter_millis,
            public load_millis,
            public router_millis,
            public extract_millis,
            public transform_extract_millis,
            public transform_load_millis,
            public load_id,
            public common_flag,
            public fallback_insert_count,
            public fallback_update_count,
            public ignore_row_count,
            public missing_delete_count,
            public skip_count,
            public total_extract_millis,
            public total_load_millis,
            public extract_job_flag,
            public extract_start_time,
            public transfer_start_time,
            public load_start_time,
            public failed_data_id,
            public failed_line_number,
            public create_by
    ){}
}