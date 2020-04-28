import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Channels} from "../model/channel.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {API} from "@config/url";
import {ChannelAdapter} from "../adapter/channel.adapter";
import {Constant} from "../data/constant-value.enum";
import {ChannelDropdownAdapter} from "../adapter/channel-dropdown.adapter";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class ChannelService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = Constant.CONTROLLER;
    private subjectMessage = new Subject();

    private channelId = new BehaviorSubject("default");
    private reloadChannelId = new BehaviorSubject("default");

    getChannelId = this.channelId.asObservable();
    getReloadChannelId = this.reloadChannelId.asObservable();

    constructor(private http: HttpClient,
                private adapter: ChannelAdapter,
                private dropDownAdapter: ChannelDropdownAdapter,
                private serverName: ServerNameService
    ) {
    }

    getURL(action: string): string {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    get(query): Observable<Channels[]> {
        let sort_by = (query.sort_by == "id") ? Constant.SORT_BY : query.sort_by;
        let page_num = query.page;
        let $limit = API.pagnation.limit;
        let $tempoffset = page_num - 1;
        let $offset = ($tempoffset > 0) ? ($tempoffset * $limit) : 0;

        let params = {
            "offset": $offset,
            "limit": $limit,
            "orderByColumn": sort_by,
            "order": query.sort_order
        };
        return this.http.post<Channels[]>(this.getURL("/getPage"), params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.adapter.adapt(item))),
        );
    }

    getByID(id: string): Observable<Channels> {
        const url = this.getURL("/get");
        let params = {
            "channel_id": id
        };
        return this.http.post(url, params).pipe(
            map((data: any) => this.adapter.adapt(data['result']))
        );
    }

    add(channel): Observable<Channels> {
        return this.http.post(this.getURL("/insert"), this.adapter.formAdapt(channel))
            .pipe(
                map((data: any) => data)
            );
    }

    update(channel): Observable<Channels> {
        const url = this.getURL("/update");
        return this.http.post(url, this.adapter.formAdapt(channel))
            .pipe(
                // map((data: any) => this.adapter.adapt(data))
                map((data: any) => data)
            );
    }

    delete(id: string): Observable<Channels> {
        const url = this.getURL("/delete");
        let params = {
            "channel_id": id
        };
        return this.http.post(url, params)
            .pipe(
                // map((data: any) => this.adapter.adapt(data))
                map((data: any) => data)
            );
    }

    getMessage(): Observable<any> {
        return this.subjectMessage.asObservable();
    }

    setMessage(message) {
        this.subjectMessage.next(message);
    }


    getByChannelId(): Observable<any> {
        let params = {
            "column": "channel_id"
        };
        return this.http.post(this.getURL("/getColumn"), params).pipe(
            map((data: any[]) => data['result'].map((item: any) => this.dropDownAdapter.adapt(item)))
        );
    }

    getByReloadChannelId(): Observable<any> {
        return this.http.post(this.getURL("/getReloadChannelId"), "").pipe(
            map((data: any[]) => this.dropDownAdapter.adapt(data['result'])),
        );
    }

    getByReloadChannelIdWithISFile(): Observable<any> {
        let params = {
            "isFile": "true"
        };
        return this.http.post(this.getURL("/getReloadChannelId"), params).pipe(
            map((data: any[]) => this.dropDownAdapter.adapt(data['result'])),
        );
    }

    setChannelID(message) {
        this.channelId.next(message);
    }

    setReloadChannelID(message) {
        this.reloadChannelId.next(message);
    }

}
