
export class GroupLinkFormModel{

    constructor(
        public source_node_group_id  : string ,
        public target_node_group_id : string ,
        public data_event_action : String ,
        public is_reversible : number ,
        public sync_config_enabled : number ,
        public create_time : string ,
        public last_update_by : string,
        public last_update_time : string
){

    }
}