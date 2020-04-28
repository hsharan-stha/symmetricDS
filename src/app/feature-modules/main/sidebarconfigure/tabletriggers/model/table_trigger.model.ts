export class TableTrigger {

    constructor(
        public id: string,
        public source_catalog_name: string,
        public source_schema_name: string,
        public source_table_name: string,
        public channel_id: string,
        public reload_channel_id: string,
        public sync_on_update: number,
        public sync_on_insert: number,
        public sync_on_delete: number,
        public sync_on_incoming_batch: number,
        public name_for_update_trigger: string,
        public name_for_insert_trigger: string,
        public name_for_delete_trigger: string,
        public sync_on_update_condition: string,
        public sync_on_insert_condition: string,
        public sync_on_delete_condition: string,
        public custom_before_update_text: string,
        public custom_before_insert_text: string,
        public custom_before_delete_text: string,
        public custom_on_update_text: string,
        public custom_on_insert_text: string,
        public custom_on_delete_text: string,
        public external_select: string,
        public tx_id_expression: string,
        public channel_expression: string,
        public excluded_column_names: string,
        public included_column_names: string,
        public sync_key_names: string,
        public use_stream_lobs: number,
        public use_capture_lobs: number,
        public use_capture_old_data: number,
        public use_handle_key_updates: number,
        public stream_row: number,
        public create_time: string,
        public last_update_by: Date,
        public last_update_time: string,
        public description: Date
    ) {

    }

}
