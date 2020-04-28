import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

import {API} from '@config/url';
import {UserAdapter} from "../adapter/user.adapter";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class UserService {

    private controllerName: string;

    private actionSource = new BehaviorSubject("default");


    action = this.actionSource.asObservable();


    constructor(
        private http: HttpClient,
        private adapter: UserAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "/Users";
    }


    setAction(action) {
        this.actionSource.next(action);
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
            username: id
        }).pipe(
            map((data: any) => {
                if (data.responceCode == 0) {
                    let result = data["result"];
                    return this.adapter.adapt(result);

                }
            })
        )
    }

    /**
     * Delete a router details
     *
     * @param id
     * @returns {any}
     */
    delete(username: string) {
        return this.http.post(this.getUrl("delete"), {username: username});
    }


    store(data) {
        return this.http.post(this.getUrl("insert"), this.adapter.formAdapt(data));
    }

    update(data) {
        return this.http.post(this.getUrl("update"), this.adapter.formAdapt(data));
    }
}
