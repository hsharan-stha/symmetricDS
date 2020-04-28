import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {API} from '@config/url';
import {Parameters} from './../model/parameters.model';
import {ParametersAdapter} from './../adapter/parameters.adapter';
import {NodeGroupIdAdapter} from './../adapter/node-group-id.adapter';
import {ServerNameService} from "@shared/services/server-name.service";


@Injectable()
export class ParametersService {

    private controllerName: string;

    private messageSource = new BehaviorSubject("default");

    currentMessage = this.messageSource.asObservable();

    constructor(
        private http: HttpClient,
        private adapter: ParametersAdapter,
        private nodeAdapter: NodeGroupIdAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "/SymParameter";
    }

    changeMessag(message: string) {
        this.messageSource.next(message);
    }

    /**
     * Get a url
     *
     * @param action
     * @returns {string}
     */
    private getUrl(action: string): string {
        return API.url + this.serverName.getServer() + this.controllerName + "/" + action;
    }

    getNodeGroupId() {
        return this.http.post(this.getUrl("getTargetNodes"), {}).pipe(
            map((data: any) => {
                if (data.responceCode == 0) {
                    let re = data["result"].map(
                        (item: any) => {
                            return this.nodeAdapter.adapt(item);
                        }
                    )

                    return re;
                }
            })
        );
    }

    /**
     * Get a list of Group links
     *
     * @returns {any}
     */
    get(query): Observable<Parameters[]> {

        let limit = API.pagnation.limit;
        let calOffset = (query.page - 1) * limit;
        query = {
            "orderByColumn": query.sort_by,
            "order": query.sort_order,
            "offset": calOffset,
            "limit": limit,
            'criteria': {
                'target_nodes': query.target_nodes,
                'categories': query.categories,
                'areSet': query.areSet
            }
        };

        return this.http.post(this.getUrl("getPage"), query).pipe(
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

    filter(data, meta) {

        let limit = API.pagnation.limit;
        let calOffset = (meta.page - 1) * limit;
        meta = {
            "orderByColumn": meta.sort_by,
            "order": meta.sort_order,
            "offset": calOffset,
            "limit": limit,
            "criteria": data
        };
        return this.http.post(this.getUrl("getPage"), meta).pipe(
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

    /**
     * Delete a parameters details
     *
     * @param id
     * @returns {any}
     */
    delete(id: string) {
        return this.http.post(this.getUrl("delete"), this.extractData(id));
    }

    /**
     * Extract  external_id , node_group_id and param_key from url
     *
     * @param id
     * @returns Object
     */
    extractData(id: string): Object {
        let splitText = decodeURI(id).split(":");
        return {
            external_id: (splitText[0]) ? splitText[0] : "",
            node_group_id: (splitText[1]) ? splitText[1] : "",
            param_key: (splitText[2]) ? splitText[2] : ""
        };
    }

    getById(id: string) {
        return this.http.post(this.getUrl("get"), this.extractData(id));
    }

    update(data) {
        return this.http.post(this.getUrl("update"), this.adapter.formAdapt(data));
    }


    getTargetNodeId() {
        let url = API.url + this.serverName.getServer() + "/SymNode/getColumn";
        return this.http.post(url, {
            column: "node_group_id"
        }).pipe(
            map((data: any) => {
                if (data.responceCode == 0) {
                    let re = data["result"].map(
                        (item: any) => {

                            return this.nodeAdapter.adapt(item);
                        }
                    );
                    re.unshift(this.nodeAdapter.adapt("ALL"));

                    return re;
                }
            })
        );
    }

}
