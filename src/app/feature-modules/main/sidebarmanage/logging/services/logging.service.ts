import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { API } from '@config/url';
import { LoggingAdapter } from './../adapter/logging.adapter';
import { Logging } from './../model/logging.model';
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class LoggingService {

    controllerName:string = "/SymLogging";

    constructor(
        private http:HttpClient,
        private adapter : LoggingAdapter,
        private serverName:ServerNameService
    ) {
    }

    /**
     * Get a url
     *
     * @param action
     * @returns {string}
     */
    private getUrl(action:string):string {
        return API.url+this.serverName.getServer() + this.controllerName + "/" + action;
    }

    /**
     * Get a list of data
     *
     * @param filters
     * @returns {any|Observable<T>|Observable<A>|Observable<B>|Observable<C>|Observable<D>}
     */
    getData(filters) : Observable<Logging[]>{
        return this.http.post<Logging[]>(this.getUrl("getPage"), this.adapter.formAdapt(filters)).pipe(
            map((item:any)=>{
                if(item.responceCode == 0 ){
                    let i = item['result'].map( (data)=>{
                        return this.adapter.adapt(data)
                    });
                    return i ;
                }
            })
        );
    }

}
