import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {FileTriggers} from "../model/file-triggers.model";
import {FileTriggersForm} from "../model/file-triggers-form.model";
import {FormAdapter} from "@core/form.adapter";

@Injectable()
export class FileTriggersAdapter implements Adapter<FileTriggers>, FormAdapter<FileTriggersForm> {
    adapt(item: any): FileTriggers {
        return new FileTriggers(
            item.trigger_id,
            item.channel_id,
            item.reload_channel_id,
            item.base_dir,
            Number(item.recurse),
            item.includes_files,
            item.excludes_files,
            Number(item.sync_on_create),
            Number(item.sync_on_modified),
            Number(item.sync_on_delete),
            Number(item.sync_on_ctl_file),
            Number(item.delete_after_sync),
            item.before_copy_script,
            item.after_copy_script,
            item.last_update_time,
            item.last_update_by,
            item.create_time,
            item.description,
        );
    }

    formAdapt(item: any): FileTriggersForm {
        return new FileTriggersForm(
            item.trigger_id,
            item.channel_id,
            item.reload_channel_id,
            item.base_dir,
            Number(item.recurse),
            item.includes_files,
            item.excludes_files,
            Number(item.sync_on_create),
            Number(item.sync_on_modified),
            Number(item.sync_on_delete),
            Number(item.sync_on_ctl_file),
            Number(item.delete_after_sync),
            item.before_copy_script,
            item.after_copy_script,
            null,
            null,
            null,
            null,
        );
    }
}