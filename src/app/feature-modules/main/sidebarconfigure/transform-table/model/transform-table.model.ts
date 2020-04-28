export class TransformTable {
    constructor(
        public id: string,
        public transform_id: string,
        public source_node_group_id: string,
        public target_node_group_id: string,
        public transform_point: string,
        public source_catalog_name: string,
        public source_schema_name: string,
        public source_table_name: string,
        public target_catalog_name: string,
        public target_schema_name: string,
        public target_table_name: string,
        public update_first: number,
        public update_action: string,
        public delete_action: string,
        public transform_order: string,
        public column_policy: string,
        public create_time: string,
        public last_update_by: string,
        public last_update_time: string,
        public description: string
    ) {

    }

}

