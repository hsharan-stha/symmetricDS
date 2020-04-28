import {Injectable} from '@angular/core';
import {Adapter} from '@core/adapter';
import {FormAdapter} from '@core/form.adapter';

import {Routers} from './../model/routers.model';

import {RoutersFormModel} from './../model/routers.form.model';

@Injectable()
export class RoutersAdapter implements Adapter<Routers>, FormAdapter<RoutersFormModel> {

    adapt(item: any) {
        return new Routers(
            item.router_id,
            item.router_id,
            item.source_node_group_id,
            item.target_node_group_id,
            item.router_type,
            item.router_expression,
            Number(item.use_source_catalog_schema),
            item.target_catalog_name,
            item.target_schema_name,
            item.target_table_name,
            Number(item.sync_on_insert),
            Number(item.sync_on_delete),
            Number(item.sync_on_update),
            item.last_update_time,
            item.last_update_by,
            item.create_time
        )
    }

    formAdapt(item: any) {
        return new RoutersFormModel(
            item.router_id,
            item.router_type,
            item.router_expression,
            item.source_node_group_id,
            item.target_node_group_id,
            Number(item.source_catalog),
            item.target_catalog,
            item.target_schema,
            item.target_table,
            Number(item.sync_on_insert),
            Number(item.sync_on_delete),
            Number(item.sync_on_update),
            null,
            null,
            null,
            null
        );
    }


}
