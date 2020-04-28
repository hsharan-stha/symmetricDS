import {API} from "@config/url";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ServerNameService} from "@shared/services/server-name.service";
import {Injectable} from "@angular/core";
import {TopbarNotification} from "../model/notification.model";
import {map} from "rxjs/operators";
import {TopbarNotificationAdapter} from "../adapter/notification.adapter";

@Injectable()
export class TopbarService {
    private URL = API.url;
    private mainURL = this.URL;
    private controller = "/Notification";

    private subject = new BehaviorSubject("default");


    getData = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private adapter: TopbarNotificationAdapter,
        private serverName: ServerNameService
    ) {
    }

    getURL(action: string): string {
        return this.mainURL + this.serverName.getServer() + this.controller + action;
    }

    getErrorCount(): Observable<any> {
        return this.http.post(this.getURL("/getErrorCount"), {});
    }

    getErrorMessages(): Observable<TopbarNotification> {
        return this.http.post(this.getURL("/getErrorMessages"), {}).pipe(
            map((data: any[]) => {
                    if (data['responceCode'] === 0) {
                        return data['result'].map((item: any) => this.adapter.adapt(item));
                    }
                }
            )
        );
    }

    setData(value) {
        this.subject.next(value);
    }
}