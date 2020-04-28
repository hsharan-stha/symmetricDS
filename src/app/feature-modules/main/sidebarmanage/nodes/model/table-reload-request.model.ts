export class TableReloadRequest {
    constructor(
        public target_node_id: string,
        public source_node_id: string,
        public trigger_id: string,
        public router_id: string,
        public create_time: Date,
        public create_table: string,
        public delete_first: string,
        public reload_select: string,
        public before_custom_sql: string,
        public reload_time: string,
        public load_id: any,
        public processed: any,
        public channel_id: string,
        public last_update_by: string,
        public last_update_time: Date
    ) {
    }

}