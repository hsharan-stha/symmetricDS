import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {API} from '@config/url';
import {GroupLinks} from './../model/group-links.model';
import {GroupLinksAdapter} from './../adapter/group-links.adapter';
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class GroupLinksService {

    private controllerName: string;
    private messageSource = new BehaviorSubject("default");
    currentMessage = this.messageSource.asObservable();

    constructor(
        private http: HttpClient,
        private adapter: GroupLinksAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "/SymGroupLinks";
    }


    changeMessag(message: string) {
        this.messageSource.next(message);
    }

    /**
     * Get a list of Group links
     *
     * @returns {any}
     */
    get(query): Observable<GroupLinks[]> {

        let limit = API.pagnation.limit;
        let calOffset = (query.page - 1) * limit;
        query = {
            "orderByColumn": query.sort_by,
            "order": query.sort_order,
            "offset": calOffset,
            "limit": limit
        };
        let mainURL = this.getUrl("getPage");
        return this.http.post(mainURL, query).pipe(
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
     * Store a group link details
     *
     * @param data
     * @returns {any|Observable<T>|Observable<A>|Observable<B>|Observable<C>|Observable<D>}
     */
    store(data: any) {

        return this.http.post(
            this.getUrl("insert"),
            this.adapter.formAdapt(data)
        );
    }

    /**
     * Get a details of group link by id
     *
     * @param id
     * @returns {any}
     */
    getById(id: string) {

        return this.http.post(this.getUrl("get"), this.extractData(id)).pipe(
            map((data: any) => {
                if (data.responceCode == 0) {
                    let result = data["result"];

                    return this.adapter.adapt(result);

                }
            })
        );
    }

    /**
     * Update a group link details
     *
     * @param data GroupLinks
     * @returns {any}
     */
    update(data: GroupLinks) {

        return this.http.post(
            this.getUrl("update"),
            this.adapter.formAdapt(data)
        );
    }

    /**
     * Delete a details of group link
     *
     * @param id
     * @returns {Observable<Object>}
     */
    delete(id: string) {
        return this.http.post(
            this.getUrl("delete"),
            this.extractData(id)
        );
    }


    getColumn() {

        return this.http.post(
            this.getUrl("getSourceGroupId"),
            {}
        );
    }

    getTargetGroupId(value: string) {

        return this.http.post(
            this.getUrl("getTargetGroupId"),
            {
                source_node_group_id: value
            }
        );
    }

    /**
     * Extract source group id and target group id from url
     *
     * @param id
     * @returns Object
     */
    extractData(id: string): Object {
        let splitText = decodeURI(id).split(":");
        return {
            source_node_group_id: (splitText[0]) ? splitText[0] : "",
            target_node_group_id: (splitText[1]) ? splitText[1] : ""
        };
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
}