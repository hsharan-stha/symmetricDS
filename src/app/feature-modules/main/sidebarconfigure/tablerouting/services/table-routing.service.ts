import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {TableRouting} from "../model/table_routing.model";
import {TableRoutingAdapter} from "../adapter/tablerouting.adapter";
import {Constant} from "../data/constant-value.enum";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class TableRoutingService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private subjectMessage = new Subject();

    constructor(
        private http: HttpClient,
        private adapter: TableRoutingAdapter,
        private serverName: ServerNameService
    ) {
    }

    getURL(action: string): string {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    get(query): Observable<TableRouting[]> {
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
        return this.http.post<TableRouting[]>(this.getURL("/getPage"), params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item))),
        );
    }

    getByID(id): Observable<TableRouting> {
        id = id.toString().split(":");
        const url = this.getURL("/get");
        let params = {
            "trigger_id": id[0],
            "router_id": id[1]
        };
        return this.http.post(url, params).pipe(
            map((data: any) => this.adapter.adapt(data['result']))
        );
    }

    add(TableRoutingData): Observable<TableRouting> {
        return this.http.post(this.getURL("/insert"), this.adapter.formAdapt(TableRoutingData))
            .pipe(
                map((data: any) => data)
            );
    }

    update(TableRoutingData): Observable<TableRouting> {
        const url = this.getURL("/update");
        return this.http.post(url, this.adapter.formAdapt(TableRoutingData))
            .pipe(
                map((data: any) => data)
            );
    }

    delete(id): Observable<TableRouting> {
        id = id.toString().split(":");
        const url = this.getURL("/delete");
        let params = {
            "trigger_id": id[0],
            "router_id": id[1]
        };
        return this.http.post(url, params)
            .pipe(
                map((data: any) => data)
            );
    }


    getMessage(): Observable<any> {
        return this.subjectMessage.asObservable();
    }

    setMessage(message) {
        this.subjectMessage.next(message);
    }

}
