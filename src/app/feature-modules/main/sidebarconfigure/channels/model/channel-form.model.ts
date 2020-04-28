export class ChannelForm {

    constructor(
        public channel_id: string,
        public processing_order: string,
        public batch_algorithm: string,
        public max_batch_size: string,
        public max_batch_to_send: string,
        public max_data_to_route: string,
        public extract_period_millis: string,
        public max_network_kbps: string,
        public data_loader_type: string,
        public queue: string,
        public data_event_action: string,
        public description: string,
        public enabled: number,
        public reload_flag: number,
        public file_sync_flag: number,
        public use_old_data_to_route: number,
        public use_row_data_to_route: number,
        public use_pk_data_to_route: number,
        public contains_big_lob: number,
        public last_update_time: Date,
        public last_update_by: string,
        public create_time: Date,
    ) {

    }

}
