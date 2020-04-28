import {Adapter} from "@core/adapter";
import {FileRouting} from "../model/file-routing.model";
import {Injectable} from "@angular/core";
import {FormAdapter} from "@core/form.adapter";
import {FileRoutingForm} from "../model/file-routing-form.model";

@Injectable()
export class FileRoutingAdapter implements Adapter<FileRouting>, FormAdapter<FileRoutingForm> {
    adapt(item: any): FileRouting {
        return new FileRouting(
            encodeURI(item.trigger_id + ":" + item.router_id),
            item.trigger_id,
            item.router_id,
            Number(item.enabled),
            Number(item.initial_load_enabled),
            item.target_base_dir,
            item.conflict_strategy,
            item.create_time,
            item.last_update_by,
            item.last_update_time,
            item.description
        );
    }

    formAdapt(item: any): FileRoutingForm {
        return new FileRoutingForm(
            item.trigger_id,
            item.router_id,
            Number(item.enabled),
            Number(item.initial_load_enabled),
            item.target_base_dir,
            item.conflict_strategy,
            null,
            null,
            null,
            null
        );
    }

}