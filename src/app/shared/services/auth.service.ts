import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';
import {AlertMessageService} from "@shared/services/alert-message.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API} from "@config/url";
import {ServerNameService} from "@shared/services/server-name.service";

@Injectable()
export class AuthService {

    // private currentUserRole: string;


    private controller = "/Users";
    private action = "/logout";

    constructor(
        private alertService: AlertMessageService,
        private router: Router,
        private http: HttpClient,
        private serverName: ServerNameService
    ) {
    }

    private messages = new BehaviorSubject('');

    messageSource = this.messages.asObservable();

    setMessage(message: string) {
        this.messages.next(message);
    }

    getUsername() {
        let username: string = "";
        let accessToken = localStorage.getItem("symmetric_interface");
        if (accessToken) {
            const jwtHelper = new JwtHelperService();
            let decodedToken = jwtHelper.decodeToken(accessToken);


            if (decodedToken) {
                username = decodedToken.data[0];
            }
        }

        return username;

    }

    /**
     * Check if user is logged in or not
     *
     * @returns {boolean}
     */
    isUserLoggedIn(): boolean {
        let accessToken = localStorage.getItem("symmetric_interface");
        if (accessToken) {
            const jwtHelper = new JwtHelperService();
            const isExpired = jwtHelper.isTokenExpired(accessToken);

            if (!isExpired) {
                return true;
            }
        }
        return false;
    }

    /**
     * Logout a user
     *
     * @return void
     */
    logoutUser() {
        return this.http.post(API.url + this.serverName.getServer() + this.controller + this.action, '').pipe(
            map((data: any) => data)
        );

    }

    wrongAuthData(data) {
        if(data){
            this.setMessage(data);
        }else{
            this.setMessage("Invalid session");
        }

        this.sessionDestroy();
    }

    sessionDestroy() {
        let accessToken = localStorage.getItem(API.token);
        if (accessToken) {
            localStorage.removeItem(API.token);
            localStorage.removeItem(API.serverName);
            localStorage.removeItem(API.nodeServerName);
            localStorage.removeItem(API.roleName);
        }
        this.router.navigateByUrl('/login');

    }

}