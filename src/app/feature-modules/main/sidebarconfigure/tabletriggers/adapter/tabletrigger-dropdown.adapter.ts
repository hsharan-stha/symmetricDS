import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {TableTriggerDropdown} from "../model/table-trigger-dropdown.model";


@Injectable()
export class TableTriggerDropdownAdapter implements Adapter<TableTriggerDropdown> {
    adapt(item: any): TableTriggerDropdown {
        return new TableTriggerDropdown(
            item
        );
    }
}

