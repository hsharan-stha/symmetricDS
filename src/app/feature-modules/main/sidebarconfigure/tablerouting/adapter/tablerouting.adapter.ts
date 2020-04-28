import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {TableRouting} from "../model/table_routing.model";
import {TableRoutingForm} from "../model/table-routing-form.model";
import {FormAdapter} from "@core/form.adapter";

@Injectable()
export class TableRoutingAdapter implements Adapter<TableRouting>, FormAdapter<TableRoutingForm> {
    adapt(item: any): TableRouting {
        return new TableRouting(
            encodeURI(item.trigger_id + ":" + item.router_id),
            item.trigger_id,
            item.router_id,
            Number(item.enabled),
            item.initial_load_order,
            item.initial_load_select,
            item.initial_load_delete_stmt,
            Number(item.ping_back_enabled),
            item.last_update_time,
            item.last_update_by,
            item.create_time,
            item.description,
        );
    }

    formAdapt(item: any): TableRoutingForm {
        return new TableRoutingForm(
            item.trigger_id,
            item.router_id,
            Number(item.enabled),
            item.initial_load_order,
            item.initial_load_select,
            item.initial_load_delete_stmt,
            Number(item.ping_back_enabled),
            null,
            null,
            null,
            null,
        );
    }
}
