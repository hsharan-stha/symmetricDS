export class InstalledTrigger {
    constructor(
        public trigger_hist_id: string,
        public id: string,
        public source_table_name: string,
        public source_catalog_name: string,
        public source_schema_name: string,
        public name_for_update_trigger: string,
        public name_for_insert_trigger: string,
        public name_for_delete_trigger: string,
        public table_hash: string,
        public trigger_row_hash: string,
        public trigger_template_hash: string,
        public column_names: string,
        public pk_column_names: string,
        public last_trigger_build_reason: string,
        public error_message: string,
        public create_time: string,
        public inactive_time: string,
    ) {
    }
}