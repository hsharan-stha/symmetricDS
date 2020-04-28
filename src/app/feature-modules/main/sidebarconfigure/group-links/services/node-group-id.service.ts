import {Injectable} from '@angular/core';
import {API} from '@config/url';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators'
import {NodeGroupIdAdapter} from './../adapter/node-group-id.adapter';
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class NodeGroupIdService {

    private source = new BehaviorSubject([]);

    dataSource = this.source.asObservable();

    controllerName: string;

    constructor(
        private http: HttpClient,
        private adapter: NodeGroupIdAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "/SymGroups";
    }

    changeData(data) {
        this.source.next(data);
    }

    get() {
        let data = {
            column: "node_group_id"
        };
        let mainURL = API.url + this.serverName.getServer() + this.controllerName + "/getColumn";
        //let mainURL = "http://192.168.187.139:8080/StaffTracker/api/group";
        //let data = {
        //    "icon_id" : 1,
        //    "name" : "symmetrcit testing"
        //}
        return this.http.post(mainURL, data).pipe(
            map((data: any) => {

                if (data.responceCode == 0) {
                    let result = data["result"];
                    if (result) {
                        let re = result.map((item: any) => {

                            return this.adapter.adapt(item);
                        });

                        return re;
                    }
                }
            })
        );
    }
}
