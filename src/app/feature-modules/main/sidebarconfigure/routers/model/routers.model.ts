
export class Routers {

    constructor(
        public id : string,
        public router_id : string ,
        public source_node_group_id : string,
        public target_node_group_id : string,
        public router_type : string ,
        public router_expression : string,
        public use_source_catalog_schema : number ,
        public target_catalog_name : string,
        public target_schema_name : string,
        public target_table_name : string,
        public sync_on_update : number ,
        public sync_on_insert : number,
        public sync_on_delete : number ,
        public last_update_time : string ,
        public last_update_by : string,
        public create_time : string
    ){

    }

}