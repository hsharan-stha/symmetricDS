export class TableRouting {
    constructor(
        public id: string,
        public trigger_id: string,
        public router_id: string,
        public enabled: number,
        public initial_load_order: string,
        public initial_load_select: string,
        public initial_load_delete_stmt: string,
        public ping_back_enabled: number,
        public last_update_time: Date,
        public last_update_by: string,
        public create_time: Date,
        public description: string
    ) {

    }
}