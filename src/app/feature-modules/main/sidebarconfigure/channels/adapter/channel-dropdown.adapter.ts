import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {ChannelDropdown} from "../model/channel-dropdown";


@Injectable()
export class ChannelDropdownAdapter implements Adapter<ChannelDropdown> {
    adapt(item: any): ChannelDropdown {
        return new ChannelDropdown(
            item,
            item
        );
    }

}
