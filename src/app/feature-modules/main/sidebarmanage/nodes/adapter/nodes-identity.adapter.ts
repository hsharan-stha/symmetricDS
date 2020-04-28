import {Adapter} from "@core/adapter";
import {Injectable} from "@angular/core";
import {NodeIdentity} from "@sidebarmanage/nodes/model/nodes-identity.model";

@Injectable()
export class NodeIdentityAdapter implements Adapter<NodeIdentity> {
    adapt(item: any): NodeIdentity {
        return new NodeIdentity(
            item.node_id
        );
    }
}