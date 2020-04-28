import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {map} from "rxjs/operators";
import {Constant} from "@sidebarmanage/nodes/data/constant-value.enum";
import {TableReloadRequest} from "@sidebarmanage/nodes/model/table-reload-request.model";
import {TableReloadRequestAdapter} from "@sidebarmanage/nodes/adapter/table-reload-request.adapter";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class TableReloadRequestService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.TABLE_RELOAD_REQUEST;


    constructor(
        private http: HttpClient,
        private adapter: TableReloadRequestAdapter,
        private serverName: ServerNameService
    ) {
    }

    private getURL(action: string): string {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    add(tableReloadRequestData): Observable<TableReloadRequest> {
        return this.http.post(this.getURL("/insert"), this.adapter.adapt(tableReloadRequestData))
            .pipe(
                map((data: any) => data)
            );
    }

}
