import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {TableTrigger} from "../model/table_trigger.model";
import {API} from "@config/url";
import {TableTriggerAdapter} from "../adapter/tabletiggers.adapter";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {Constant} from "../data/constant-value.enum";
import {TableTriggerDropdownAdapter} from "../adapter/tabletrigger-dropdown.adapter";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class TableTriggersService {

    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private subjectMessage = new Subject();

    private TriggerId = new BehaviorSubject("default");
    getTriggerId = this.TriggerId.asObservable();


    constructor(private http: HttpClient,
                private alertService: AlertMessageService,
                private adapter: TableTriggerAdapter,
                private dropdownAdapter: TableTriggerDropdownAdapter,
                private serverName: ServerNameService
    ) {
    }

    getURL(action: string): string {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    get(query): Observable<TableTrigger[]> {
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
        return this.http.post<TableTrigger[]>(this.getURL("/getPage"), params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item))),
        );
    }

    getByID(id: string): Observable<any> {
        const url = this.getURL("/get");
        let params = {
            "trigger_id": id
        };
        return this.http.post(url, params).pipe(
            map((data: any) => this.adapter.adapt(data['result']))
            // ,
            // catchError((error: any) => {
            //     let errorMessage = (error['error']['result']);
            //     this.alertService.show({
            //         message: errorMessage,
            //         alertType: "danger",
            //         destroy: false,
            //     });
            // })
        );
    }

    add(TableTriggerData): Observable<TableTrigger> {
        return this.http.post(this.getURL("/insert"), this.adapter.formAdapt(TableTriggerData))
            .pipe(
                map((data: any) => data)
            );
    }

    update(TableTriggerData): Observable<TableTrigger> {
        const url = this.getURL("/update");
        return this.http.post(url, this.adapter.formAdapt(TableTriggerData))
            .pipe(
                map((data: any) => data)
            );
    }

    delete(id: string): Observable<TableTrigger> {
        const url = this.getURL("/delete");
        let params = {
            "trigger_id": id
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

    getByTriggerID(): Observable<any> {
        let params = {
            "column": "trigger_id"
        };
        return this.http.post(this.getURL("/getColumn"), params).pipe(
            map((data: any[]) => this.dropdownAdapter.adapt(data['result'])),
        );
    }

    setTriggerID(data) {
        this.TriggerId.next(data);
    }
}
