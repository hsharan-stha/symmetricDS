
export class ParametersForm{
    constructor(
        public external_id : string ,
        public node_group_id : string ,
        public param_key : string ,
        public param_value : string ,
        public create_time : string ,
        public last_update_by : string ,
        public last_update_time : string
    ){}
}