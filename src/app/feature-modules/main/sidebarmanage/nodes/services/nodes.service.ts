import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {Constant} from "../data/constant-value.enum";
import {HttpClient} from "@angular/common/http";
import {NodesAdapter} from "../adapter/nodes.adapter";
import {Observable} from 'rxjs/Observable';
import {map} from "rxjs/operators";
import {Nodes} from "../model/nodes.model";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class NodesService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;


    constructor(
        private http: HttpClient,
        private adapter: NodesAdapter,
        private serverName: ServerNameService
    ) {
    }

    private getURL(action: string): any {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    get(query): Observable<any> {
        let sort_by = (query.sort_by == "id") ? Constant.SORT_BY : query.sort_by;
        let page_num = query.page;
        let $limit = API.pagnation.limit;
        let $tempoffset = page_num - 1;
        let $offset = ($tempoffset > 0) ? ($tempoffset * $limit) : 0;

        let params = {
            "offset": $offset,
            "limit": $limit,
            "orderByColumn": sort_by,
            "order": query.sort_order
        };
        return this.http.post<Nodes[]>(this.getURL("/getPage"), params).pipe(
            map((data: any[]) => {
                if (data['responceCode'] === 0) {
                    let re = data['result'].map((item: any) => this.adapter.adapt(item));
                    return re;
                }
            }),
        );
    }

    action(id: string, task): Observable<any> {
        let params = {
            "node_id": id
        };
        return this.http.post(this.getURL("/" + task), params)
            .pipe(
                map((data: any) => data)
            );
    }

}
