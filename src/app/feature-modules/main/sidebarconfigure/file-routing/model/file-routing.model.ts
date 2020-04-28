export class FileRouting {
    constructor(
        public id: string,
        public trigger_id: string,
        public router_id: string,
        public enabled: number,
        public initial_load_enabled: number,
        public target_base_dir: string,
        public conflict_strategy: string,
        public create_time: Date,
        public last_update_by: string,
        public last_update_time: Date,
        public description: string
    ) {

    }
}