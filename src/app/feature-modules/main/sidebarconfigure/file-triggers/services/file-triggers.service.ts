import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {FileTriggersAdapter} from "../adapter/file-triggers.adapter";
import {FileTriggers} from "../model/file-triggers.model";
import {Constant} from "../data/constant-value.enum";
import {FileTriggersDropdownAdapter} from "../adapter/file-trigger-dropdown.adapter";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class FileTriggersService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private subjectMessage = new Subject();

    private FileTriggerId = new BehaviorSubject("default");
    getFileTriggerId = this.FileTriggerId.asObservable();

    constructor(private http: HttpClient,
                private adapter: FileTriggersAdapter,
                private dropdownAdapter: FileTriggersDropdownAdapter,
                private serverName: ServerNameService
    ) {
    }

    getURL(action: string): string {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    get(query): Observable<FileTriggers[]> {
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
        return this.http.post<FileTriggers[]>(this.getURL("/getPage"), params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item))),
        );
    }

    getByID(id: string): Observable<FileTriggers> {
        const url = this.getURL("/get");
        let params = {
            "trigger_id": id
        };
        return this.http.post(url, params).pipe(
            map((data: any) => this.adapter.adapt(data['result']))
        );
    }

    add(FileTriggersData): Observable<FileTriggers> {
        return this.http.post(this.getURL("/insert"), this.adapter.formAdapt(FileTriggersData))
            .pipe(
                map((data: any) => data)
            );
    }

    update(FileTriggersData): Observable<FileTriggers> {
        const url = this.getURL("/update");
        return this.http.post(url, this.adapter.formAdapt(FileTriggersData))
            .pipe(
                map((data: any) => data)
            );
    }

    delete(id: string): Observable<FileTriggers> {
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

    getByFileTriggerID(): Observable<any> {
        let params = {
            "column": "trigger_id"
        };
        return this.http.post(this.getURL("/getColumn"), params).pipe(
            map((data: any[]) => this.dropdownAdapter.adapt(data['result'])),
        );
    }

    setFileTriggerID(data) {
        this.FileTriggerId.next(data);
    }
}
