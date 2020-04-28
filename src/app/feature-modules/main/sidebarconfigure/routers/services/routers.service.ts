import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {API} from '@config/url';
import {RoutersAdapter} from './../adapter/routers.adapter';
import {RouterTypeAdapter} from "../adapter/router-type.adapter";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class RoutersService {

    private controllerName: string;

    private messageSource = new BehaviorSubject("default");
    private RouterID = new BehaviorSubject("default");

    message = this.messageSource.asObservable();
    getRouterID = this.RouterID.asObservable();

    constructor(
        private http: HttpClient,
        private adapter: RoutersAdapter,
        private dropdownAdapter: RouterTypeAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "/SymRouters";
    }

    setMessage(message: string) {
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

    private getRouterId(id) {
        return {
            router_id: id
        };
    }

    get(query) {
        let limit = API.pagnation.limit;
        let calOffset = (query.page - 1) * limit;
        query = {
            "orderByColumn": query.sort_by,
            "order": query.sort_order,
            "offset": calOffset,
            "limit": limit
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
        )
    }

    getById(id: string) {

        return this.http.post(this.getUrl("get"), {
            router_id: id
        }).pipe(
            map((data: any) => {
                if (data.responceCode == 0) {
                    let result = data["result"];
                    return this.adapter.adapt(result);

                }
            })
        )
    }

    store(data) {
        return this.http.post(this.getUrl("insert"), this.adapter.formAdapt(data));
    }

    update(data) {

        return this.http.post(this.getUrl("update"), this.adapter.formAdapt(data));

    }

    /**
     * Delete a router details
     *
     * @param id
     * @returns {any}
     */
    delete(id: string) {
        return this.http.post(this.getUrl("delete"), this.getRouterId(id));
    }


    /**
     * get a router details by column
     *
     * @param column
     * @returns {any}
     */
    getByRouterID(): Observable<any> {
        let params = {
            "column": "router_id"
        };
        return this.http.post(this.getUrl("getColumn"), params).pipe(
            map((data: any[]) => this.dropdownAdapter.adapt(data['result'])),
        );
    }

    setRouterID(data) {
        this.RouterID.next(data);
    }

}