export class Nodes {
    constructor(
        public id: string,
        public node_group_id: string,
        public external_id: string,
        public heartbeat_time: string,
        public timezone_offset: string,
        public sync_enabled: string,
        public sync_url: string,
        public schema_version: string,
        public symmetric_version: string,
        public config_version: string,
        public database_type: string,
        public database_version: string,
        public batch_to_send_count: string,
        public batch_in_error_count: string,
        public created_at_node_id: string,
        public deployment_type: string,
        public deployment_sub_type: string,
    ) {

    }

}
