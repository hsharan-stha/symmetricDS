import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {API} from "@config/url";
import {Constant} from "../data/constant-value.enum";
import {SourceTablesNamesAdapter} from "@sidebarconfigure/tabletriggers/adapter/source-tables-names.adapter";
import {SourceTablesNames} from "@sidebarconfigure/tabletriggers/model/source-tables-names.model";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class SourceTablesNameService {

    private URL = API.url;
    private mainURL = this.URL;
    private controllerName = Constant.CONTROLLER;

    constructor(private http: HttpClient, private adapter: SourceTablesNamesAdapter, private serverName: ServerNameService) {
    }

    get(query): Observable<SourceTablesNames[]> {
        let sort_by = (query.sort_by == "id") ? Constant.SORT_BY : query.sort_by;
        let page_num = query.page;
        let $limit = API.pagnation.limit;
        let $tempoffset = page_num - 1;
        let $offset = ($tempoffset > 0) ? ($tempoffset * $limit) : 0;

        let params = {
            "offset": $offset,
            "limit": $limit,
            "orderByColumn": sort_by,
            "order": query.sort_order,
            "target_node_id": query.target_node_id,
            "source_node_id": query.source_node_id
            // "target_node_id" : "PRIMARY",
            // "source_node_id" : "GE_BEELINE_SERVICE_VASUP_01"
        };

        return this.http.post<SourceTablesNames[]>(this.mainURL + this.serverName.getServer() + this.controllerName + "/getSourceTableNames", params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item))),
        );
    }
}
