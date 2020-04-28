import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {TableTrigger} from "../model/table_trigger.model";
import {TableTriggerForm} from "../model/table-trigger-form.model";
import {FormAdapter} from "@core/form.adapter";

@Injectable()
export class TableTriggerAdapter implements Adapter<TableTrigger>, FormAdapter<TableTriggerForm> {
    adapt(item: any): TableTrigger {
        return new TableTrigger(
            item.trigger_id,
            item.source_catalog_name,
            item.source_schema_name,
            item.source_table_name,
            item.channel_id,
            item.reload_channel_id,
            Number(item.sync_on_update),
            Number(item.sync_on_insert),
            Number(item.sync_on_delete),
            Number(item.sync_on_incoming_batch),
            item.name_for_update_trigger,
            item.name_for_insert_trigger,
            item.name_for_delete_trigger,
            item.sync_on_update_condition,
            item.sync_on_insert_condition,
            item.sync_on_delete_condition,
            item.custom_before_update_text,
            item.custom_before_insert_text,
            item.custom_before_delete_text,
            item.custom_on_update_text,
            item.custom_on_insert_text,
            item.custom_on_delete_text,
            item.external_select,
            item.tx_id_expression,
            item.channel_expression,
            item.excluded_column_names,
            item.included_column_names,
            item.sync_key_names,
            Number(item.use_stream_lobs),
            Number(item.use_capture_lobs),
            Number(item.use_capture_old_data),
            Number(item.use_handle_key_updates),
            Number(item.stream_row),
            item.create_time,
            item.last_update_by,
            item.last_update_time,
            item.description
        );
    }

    formAdapt(item: any): TableTriggerForm {
        return new TableTriggerForm(
            item.trigger_id,
            item.source_catalog_name,
            item.source_schema_name,
            item.source_table_name,
            item.channel_id,
            item.reload_channel_id,
            Number(item.sync_on_update),
            Number(item.sync_on_insert),
            Number(item.sync_on_delete),
            Number(item.sync_on_incoming_batch),
            null,
            null,
            null,
            item.sync_on_update_condition,
            item.sync_on_insert_condition,
            item.sync_on_delete_condition,
            null,
            null,
            null,
            item.custom_on_update_text,
            item.custom_on_insert_text,
            item.custom_on_delete_text,
            item.external_select,
            null,
            item.channel_expression,
            item.excluded_column_names,
            item.included_column_names,
            item.sync_key_names,
            Number(item.use_stream_lobs),
            Number(item.use_capture_lobs),
            Number(item.use_capture_old_data),
            Number(item.use_handle_key_updates),
            Number(item.stream_row),
            null,
            null,
            null,
            null
        );
    }
}

