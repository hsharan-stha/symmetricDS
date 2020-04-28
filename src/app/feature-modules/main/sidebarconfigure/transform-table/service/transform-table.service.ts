import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ServerNameService} from "@shared/services/server-name.service";
import {map} from "rxjs/operators";
import {Constant} from "@sidebarconfigure/transform-table/data/constant-value.enum";
import {TransformTableAdapter} from "@sidebarconfigure/transform-table/adapter/transform-table.adapter";
import {TransformTable} from "@sidebarconfigure/transform-table/model/transform-table.model";

@Injectable()
export class TransformTableService {

    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private subjectMessage = new Subject();


    constructor(
        private http: HttpClient,
        private adapter: TransformTableAdapter,
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

    getByID(id): Observable<TransformTable> {
        id = id.toString().split(":");
        const url = this.getURL("/get");
        let params = {
            "transform_id": id[0],
            "source_node_group_id": id[1],
            "target_node_group_id": id[2]
        };
        return this.http.post(url, params).pipe(
            // map((data: any[]) => data.map((item: any) => this.adapter.adapt(item))),
            map((data: any) => this.adapter.adapt(data['result']))
        );
    }

    add(TransformTableData): Observable<TransformTable> {
        return this.http.post(this.getURL("/insert"), this.adapter.formAdapt(TransformTableData))
            .pipe(
                map((data: any) => data)
            );
    }

    update(TransformTableData): Observable<TransformTable> {
        const url = this.getURL("/update");
        return this.http.post(url, this.adapter.formAdapt(TransformTableData))
            .pipe(
                map((data: any) => data)
            );
    }

    delete(id): Observable<TransformTable> {
        id = id.toString().split(":");
        let params = {
            "transform_id": id[0],
            "source_node_group_id": id[1],
            "target_node_group_id": id[2]
        };
        const url = this.getURL("/delete");
        return this.http.post(url, params)
            .pipe(
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

    /**
     * Get a transform id list
     * 
     * 
     */
    getByTransformId(){
        
        return this.http.post(this.getURL("/getColumn"),{
            "column" : "transform_id"
        });
    }
}
