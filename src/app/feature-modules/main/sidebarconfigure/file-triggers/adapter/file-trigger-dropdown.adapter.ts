import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {FileTriggerDropdown} from "../model/file-trigger-dropdown.model";


@Injectable()
export class FileTriggersDropdownAdapter implements Adapter<FileTriggerDropdown> {
    adapt(item: any): FileTriggerDropdown {
        return new FileTriggerDropdown(
            item
        );
    }
}