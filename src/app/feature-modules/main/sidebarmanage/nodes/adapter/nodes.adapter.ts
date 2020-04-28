import {Adapter} from "@core/adapter";
import {Nodes} from "../model/nodes.model";
import {Injectable} from "@angular/core";

@Injectable()
export class NodesAdapter implements Adapter<Nodes> {
    adapt(item: any): Nodes {
        return new Nodes(
            item.node_id,
            item.node_group_id,
            item.external_id,
            item.heartbeat_time,
            item.timezone_offset,
            item.sync_enabled,
            item.sync_url,
            item.schema_version,
            item.symmetric_version,
            item.config_version,
            item.database_type,
            item.database_version,
            item.batch_to_send_count,
            item.batch_in_error_count,
            item.created_at_node_id,
            item.deployment_type,
            item.deployment_sub_type
        );
    }
}