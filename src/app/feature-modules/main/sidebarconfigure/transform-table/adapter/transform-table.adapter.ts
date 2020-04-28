import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {TransformTable} from "@sidebarconfigure/transform-table/model/transform-table.model";
import {FormAdapter} from "@core/form.adapter";
import {FormTransformTable} from "@sidebarconfigure/transform-table/model/form-transform-table.model";

@Injectable()
export class TransformTableAdapter implements Adapter<TransformTable>, FormAdapter<FormTransformTable> {
    adapt(item: any): TransformTable {
        return new TransformTable(
            encodeURI(item.transform_id + ":" + item.source_node_group_id + ":" + item.target_node_group_id),
            item.transform_id,
            item.source_node_group_id,
            item.target_node_group_id,
            item.transform_point,
            item.source_catalog_name,
            item.source_schema_name,
            item.source_table_name,
            item.target_catalog_name,
            item.target_schema_name,
            item.target_table_name,
            Number(item.update_first),
            item.update_action,
            item.delete_action,
            item.transform_order,
            item.column_policy,
            item.create_time,
            item.last_update_by,
            item.last_update_time,
            item.description
        );
    }

    formAdapt(item: any): FormTransformTable {
        return new FormTransformTable(
            item.transform_id,
            item.source_node_group_id,
            item.target_node_group_id,
            item.transform_point,
            item.source_catalog_name,
            item.source_schema_name,
            item.source_table_name,
            item.target_catalog_name,
            item.target_schema_name,
            item.target_table_name,
            Number(item.update_first),
            item.update_action,
            item.delete_action,
            item.transform_order,
            item.column_policy,
            null,
            null,
            null,
            item.description
        );
    }

}