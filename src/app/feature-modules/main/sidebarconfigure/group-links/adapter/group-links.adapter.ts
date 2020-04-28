import { Injectable } from '@angular/core';
import { GroupLinks } from './../model/group-links.model';
import { GroupLinkFormModel } from "./../model/group-links.form.model"
import { Adapter } from '@core/adapter';
import { FormAdapter } from '@core/form.adapter';

import { LinkData } from './../data/link.data';
import { Link } from './../model/link.model';

@Injectable()
export class GroupLinksAdapter implements Adapter<GroupLinks>,FormAdapter<GroupLinkFormModel>{


    adapt(item : any) : GroupLinks{

        return new GroupLinks(
            encodeURI(item.source_node_group_id+":"+item.target_node_group_id ),
            item.source_node_group_id,
            LinkData.getByCode(item.data_event_action),
            item.target_node_group_id ,
            Number(item.sync_config_enabled),
            Number(item.is_reversible),
            item.last_update_time,
            item.last_update_by,
            item.create_time
        )
    }



    formAdapt(item : any) : GroupLinkFormModel{
        return new GroupLinkFormModel(
            item.source_node_group_id,
            item.target_node_group_id ,
            LinkData.getByName(item.data_event_action),
            Number(item.sync_config_enabled),
            Number(item.is_reversible),
            null,
            null,
            null
        );
    }


}