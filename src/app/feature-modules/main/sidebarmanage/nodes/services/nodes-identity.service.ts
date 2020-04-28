import {Injectable} from '@angular/core';
import {API} from "@config/url";
import {Constant} from "@sidebarmanage/nodes/data/constant-value.enum";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {map} from "rxjs/operators";
import {NodeIdentityAdapter} from "@sidebarmanage/nodes/adapter/nodes-identity.adapter";
import {NodeIdentity} from "@sidebarmanage/nodes/model/nodes-identity.model";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class NodeIdentityService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.NODE_IDENTITY;


    constructor(
        private http: HttpClient,
        private adapter: NodeIdentityAdapter,
        private serverName: ServerNameService
    ) {
    }

    get(): Observable<NodeIdentity> {
        return this.http.post(this.mainURL + this.serverName.getServer() + this.controller + "/getPage", '').pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item))),
        );
    }

}
