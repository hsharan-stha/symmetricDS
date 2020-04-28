import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Group} from "../model/group.model";
import {map} from 'rxjs/operators';
import {API} from "@config/url";
import {GroupAdapter} from "../adapter/group.adapter";
import {Constant} from "../data/constant-value.enum";
import {ServerNameService} from "@shared/services/server-name.service";


@Injectable()
export class GroupService {

    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private subjectMessage = new Subject();


    constructor(
        private http: HttpClient,
        private adapter: GroupAdapter,
        private serverName: ServerNameService
    ) {
    }

    getURL(action: string): string {
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

        return this.http.post(this.getURL("/getPage"), params).pipe(
            map((data: any[]) => {
                    if (data['responceCode'] === 0) {
                        return data['result'].map((item: any) => this.adapter.adapt(item));
                    }
                }
            )
        );
    }

    getByID(id: string): Observable<Group> {
        let params = {
            "node_group_id": id
        };
        const url = this.getURL("/get");
        return this.http.post(url, params).pipe(
            // map((data: any[]) => data.map((item: any) => this.adapter.adapt(item))),
            map((data: any) => this.adapter.adapt(data['result']))
        );
    }

    add(group): Observable<Group> {
        return this.http.post(this.getURL("/insert"), group)
            .pipe(
                // map((data: any) => this.adapter.adapt(data))
                map((data: any) => data)
            );
    }

    update(group): Observable<Group> {
        const url = this.getURL("/update");
        return this.http.post(url, group)
            .pipe(
                // map((data: any) => this.adapter.adapt(data))
                map((data: any) => data)
            );
    }

    delete(id: string): Observable<Group> {
        let params = {
            "node_group_id": id
        };
        const url = this.getURL("/delete");
        return this.http.post(url, params)
            .pipe(
                // map((data: any) => this.adapter.adapt(data))
                map((data: any) => data)
            );
    }


    // getMessage and setMessage is for reload page after CUD
    getMessage(): Observable<any> {
        return this.subjectMessage.asObservable();
    }

    setMessage(message) {
        this.subjectMessage.next(message);
    }


}
