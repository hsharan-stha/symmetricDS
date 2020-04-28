import {Injectable} from "@angular/core";
import {Adapter} from "@core/adapter";
import {SourceTablesNames} from "@sidebarconfigure/tabletriggers/model/source-tables-names.model";


@Injectable()
export class SourceTablesNamesAdapter implements Adapter<SourceTablesNames> {
    adapt(item: any): SourceTablesNames {
        return new SourceTablesNames(
            encodeURI(item.source_table_name + ":" + item.router_id + ":" + item.trigger_id), // this act as id
            item.source_catalog_name,
            item.source_table_name,
            item.router_id,
            item.trigger_id
        );
    }
}

