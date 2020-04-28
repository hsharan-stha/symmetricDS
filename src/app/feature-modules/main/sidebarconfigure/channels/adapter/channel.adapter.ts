import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {Channels} from "../model/channel.model";
import {ChannelForm} from "../model/channel-form.model";
import {FormAdapter} from "@core/form.adapter";

@Injectable()
export class ChannelAdapter implements Adapter<Channels>, FormAdapter<ChannelForm> {
    adapt(item: any): Channels {
        return new Channels(
            item.channel_id,
            item.processing_order,
            item.batch_algorithm,
            item.max_batch_size,
            item.max_batch_to_send,
            item.max_data_to_route,
            item.extract_period_millis,
            item.max_network_kbps,
            item.data_loader_type,
            item.queue,
            item.data_event_action,
            item.description,
            Number(item.enabled),
            Number(item.reload_flag),
            Number(item.file_sync_flag),
            Number(item.use_old_data_to_route),
            Number(item.use_row_data_to_route),
            Number(item.use_pk_data_to_route),
            Number(item.contains_big_lob),
            item.last_update_time,
            item.last_update_by,
            item.create_time,
        );
    }

    formAdapt(item: any): ChannelForm {
        return new ChannelForm(
            item.channel_id,
            item.processing_order,
            item.batch_algorithm,
            item.max_batch_size,
            item.max_batch_to_send,
            item.max_data_to_route,
            '0',
            item.max_network_kbps,
            item.data_loader_type,
            item.queue,
            item.data_event_action,
            item.description,
            Number(item.enabled),
            Number(item.reload_flag),
            Number(item.file_sync_flag),
            Number(item.use_old_data_to_route),
            Number(item.use_row_data_to_route),
            Number(item.use_pk_data_to_route),
            Number(item.contains_big_lob),
            null,
            null,
            null,
        );
    }
}
