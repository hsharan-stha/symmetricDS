
import { Injectable } from '@angular/core';

import { NodeGroupId } from './../model/node-group-id.model';
import { Adapter } from '@core/adapter';


@Injectable()
export class NodeGroupIdAdapter implements Adapter<NodeGroupId>{


    adapt(item : any) : NodeGroupId{

        return new NodeGroupId(
           item
        )
    }




}
