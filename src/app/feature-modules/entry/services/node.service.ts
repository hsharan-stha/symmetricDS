import {Injectable} from '@angular/core';
import {API} from '@config/url';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';


import {Node} from './../model/node.model';
import {NodeAdapter} from './../adapter/node.adapter';
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class NodeService {

    private controllerName: string;

    constructor(
        private http: HttpClient,
        private adapter: NodeAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "Servers";
    }

    /**
     * Get a url
     *
     * @param action
     * @returns {string}
     */
    private getUrl(action: string): string {
        let id = this.serverName.getServer() ? this.serverName.getServer() : 1;
        return API.url + id + "/" + this.controllerName + "/" + action;
    }

    /**
     * Get a node list
     *
     * @returns {any|Observable<Node>
     */
    get(): Observable<Node[]> {
       
        return this.http.post<Node[]>(this.getUrl("getServerList"), {}).pipe(
            map((data: any) => {
                if (data['responceCode'] === 0) {
                    let result = data['result'].map((item: any) => {
                        return this.adapter.adapt(item);
                    });
                    return result;
                }
            })
        );
    }

}
