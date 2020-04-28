import {Adapter} from "@core/adapter";
import {Injectable} from "@angular/core";
import {TableReloadRequest} from "@sidebarmanage/nodes/model/table-reload-request.model";

@Injectable()
export class TableReloadRequestAdapter implements Adapter<TableReloadRequest> {
    adapt(item: any): TableReloadRequest {
        return new TableReloadRequest(
            item.target_node_id,
            item.source_node_id,
            item.trigger_id,
            item.router_id,
            null,
            item.create_table,
            item.delete_first,
            item.reload_select,
            item.before_custom_sql,
            null,
            0,
            0,
            item.channel_id,
            null,
            null
        );
    }
}