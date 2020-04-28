import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Constant} from "@sidebarmanage/installed-trigger/data/constant-value.enum";
import {InstallerTriggerAdapter} from "@sidebarmanage/installed-trigger/adapter/installed-trigger.adapter";
import {InstalledTrigger} from "@sidebarmanage/installed-trigger/model/installed-trigger.model";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class InstalledTriggerService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private triggerController = Constant.TRIGGER_CONTROLLER;


    constructor(
        private http: HttpClient,
        private adapter: InstallerTriggerAdapter,
        private serverName: ServerNameService
    ) {
    }

    getURL(control, action: string): string {
        return this.mainURL + this.serverName.getServer() + control + action;
    }

    get(query): Observable<InstalledTrigger[]> {
        let sort_by = (query.sort_by == "id") ? Constant.SORT_BY_TRIGGER : query.sort_by;
        let page_num = query.page;
        let $limit = API.pagnation.limit;
        let $tempoffset = page_num - 1;
        let $offset = ($tempoffset > 0) ? ($tempoffset * $limit) : 0;

        let params = {
            "offset": $offset,
            "limit": $limit,
            "orderByColumn": sort_by,
            "order": query.sort_order,
            "criteria": {
                "showSymTriggers": query.showSymTrigger
            }
        };
        return this.http.post<InstalledTrigger[]>(this.getURL(this.controller, "/getPage"), params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item)))
        );
    }


    action(id: string, task): Observable<any> {
        let params: any;
        if (task !== Constant.REBUILDALL) {
            params = {
                "trigger_id": id
            };
        } else {
            params = "";
        }
        return this.http.post(this.getURL(this.triggerController, "/" + task), params)
            .pipe(
                map((data: any) => data)
            );
    }
}
