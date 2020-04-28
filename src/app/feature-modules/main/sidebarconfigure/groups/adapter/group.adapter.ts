import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {Group} from "../model/group.model";

@Injectable()
export class GroupAdapter implements Adapter<Group> {
    adapt(item: any): Group {
        return new Group(
            // item._id.$oid,
            item.node_group_id,
            item.description,
            item.last_update_time,
            item.last_update_by,
            item.create_time);
    }
}