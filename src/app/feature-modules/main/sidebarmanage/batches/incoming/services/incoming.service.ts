import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {API} from '@config/url';
import {IncomingAdapter} from './../adapter/incoming.adapter';
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class IncomingService {

    controllerName: string = "/SymIncomingBatch";

    constructor(
        private http: HttpClient,
        private adapter: IncomingAdapter,
        private serverName: ServerNameService
    ) {
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


    getData(query, filterData) {

        let limit = API.pagnation.limit;
        let calOffset = (query.page - 1) * limit;
        query = {
            "orderByColumn": query.sort_by,
            "order": query.sort_order,
            "offset": calOffset,
            "limit": limit
        };

        query.criteria = {};
        if (filterData.channel_id != "") {
            query.criteria.channel_id = filterData.channel_id;
        }

        if (filterData.status != "") {
            if (filterData.status == 1) {
                query.criteria.error_flag = filterData.status;
            } else {
                query.criteria.status = filterData.status;
            }
        }



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

    ignoreBatch(data) {
        return this.http.post(this.getUrl("Update"), data);
    }

    clearStaging(data) {
        return this.http.post(this.getUrl("clearStaging"), this.setBatchId(data));


    }

    setBatchId(id) {
        return {
            batch_id: id
        }
    }

    clearTableCache(data) {
        return this.http.post(this.getUrl("clearTableCashe"), this.setBatchId(data));
    }


}
