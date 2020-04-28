import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@config/url';
import { ServerNameService } from '@shared/services/server-name.service';
import { TransformColumnAdapter } from '../adapter/transform-column.adapter';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransformColumn } from '../model/transform-column.model';

@Injectable()
export class TranformColumnService {

    private controllerName: string;
  
    private messageSource = new BehaviorSubject("default");
   
    currentMessage = this.messageSource.asObservable();


    constructor(
        private http : HttpClient,
        private adapter : TransformColumnAdapter,
        private serverName: ServerNameService
    ) {
        this.controllerName = "/SymTransformColumn";
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

     
    get(query){
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

    store(data) {
        return this.http.post(this.getUrl("insert"), this.adapter.formAdapt(data));
    }

    update(data){
        return this.http.post(this.getUrl("update"), this.adapter.formAdapt(data));
    }


    getById(id) : Observable<TransformColumn>{
        return this.http.post<TransformColumn>(
            this.getUrl("get"),
            this.extractData(id)
        ).pipe(
            map((data : any)=>{
                if (data.responceCode == 0) {
                    let result = data["result"];
                    if (result) {
                        return this.adapter.adapt(result);   
                    }
                }
            })
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

    /**
     * Extract source group id and target group id from url
     *
     * @param id
     * @returns Object
     */
    extractData(id: string): Object {
        let splitText = decodeURI(id).split(":");
        return {
            transform_id: (splitText[0]) ? splitText[0] : "",
            include_on: (splitText[1]) ? splitText[1] : "",
            target_column_name  : (splitText[2]) ? splitText[2] : ""
        };
    }

    getColumnName(transformId){
        return this.http.post(
            this.getUrl("getColumnsList"),
            {
                transform_id : transformId
            }
        );
    }

}
