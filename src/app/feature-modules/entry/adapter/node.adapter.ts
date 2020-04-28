import { Injectable } from '@angular/core';

import { Adapter } from '@core/adapter';
import { Node } from './../model/node.model';

@Injectable()
export class NodeAdapter  implements Adapter<Node>{

    adapt(item : any) : Node{

        return new Node(
            item.id,
            item.name
        )
    }
}