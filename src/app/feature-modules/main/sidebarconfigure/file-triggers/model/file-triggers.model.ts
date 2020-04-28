export class FileTriggers {
    constructor(
        public id: string,
        public channel_id: string,
        public reload_channel_id: string,
        public base_dir: string,
        public recurse: number,
        public includes_files: string,
        public excludes_files: string,
        public sync_on_create: number,
        public sync_on_modified: number,
        public sync_on_delete: number,
        public sync_on_ctl_file: number,
        public delete_after_sync: number,
        public before_copy_script: string,
        public after_copy_script: string,
        public last_update_time: Date,
        public last_update_by: string,
        public create_time: Date,
        public description: string,
    ) {

    }
}