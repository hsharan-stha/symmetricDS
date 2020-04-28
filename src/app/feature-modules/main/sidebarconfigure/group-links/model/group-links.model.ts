import { Link } from './link.model';
import { NodeGroupId } from './node-group-id.model';

export class GroupLinks {

    constructor(
        public id : string,

        public source_node_group_id : string ,

        public data_event_action : String ,

        public target_node_group_id : string ,

        public sync_config_enabled : number ,

        public is_reversible : number ,

        public last_update_time : Date ,

        public last_update_by : string ,

        public create_time : Date
    ){

    }
}
