import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {API} from '@config/url';

import {ServerNameService} from "@shared/services/server-name.service";
import {AuthService} from '@shared/services/auth.service';

@Injectable()
export class LoginService {
    private mainURL = API.url;
    private controller = "Users";
    private action = "/verify";


    private messages = new BehaviorSubject('');

    messageSource = this.messages.asObservable();

    constructor(private http: HttpClient, private serverName: ServerNameService, private authService: AuthService) {
    }

    setMessage(message: string) {
        this.messages.next(message);
    }

    login(data) {
        return this.http.post(this.mainURL + this.serverName.getServer() + "/" + this.controller + this.action, data).pipe(
            map((data: any) => {
            
                if (data['responceCode'] === 0) {
                    localStorage.setItem(API.token, data['result']['token']);
                    localStorage.setItem(API.roleName, btoa(data['result']['role']));
                }
                return data;
            })
        );
    }

}
