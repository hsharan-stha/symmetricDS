import {Adapter} from "@core/adapter";
import {InstalledTrigger} from "@sidebarmanage/installed-trigger/model/installed-trigger.model";
import {Injectable} from "@angular/core";

@Injectable()
export class InstallerTriggerAdapter implements Adapter<InstalledTrigger> {
    adapt(item: any): InstalledTrigger {
        return new InstalledTrigger(
            item.trigger_hist_id,
            item.trigger_id,
            item.source_table_name,
            item.source_catalog_name,
            item.source_schema_name,
            item.name_for_update_trigger,
            item.name_for_insert_trigger,
            item.name_for_delete_trigger,
            item.table_hash,
            item.trigger_row_hash,
            item.trigger_template_hash,
            item.column_names,
            item.pk_column_names,
            item.last_trigger_build_reason,
            item.error_message,
            item.create_time,
            item.inactive_time,
        );
    }

}