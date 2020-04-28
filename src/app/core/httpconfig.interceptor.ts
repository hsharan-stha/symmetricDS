import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, throwError,} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {AlertMessageService} from "@shared/services/alert-message.service";
import {AuthService} from "@shared/services/auth.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertMessageService,
                private authService: AuthService,
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = localStorage.getItem("symmetric_interface");
        if (!request.headers.has("Content-Type")) {
            request = request.clone(
                {
                    headers: request.headers.set("Content-Type", "application/json; charset=UTF-8")
                }
            )
        }
        if (token) {
            request = request.clone(
                {
                    headers: request.headers.set('Authorization', token)
                }
            );
        }


        request = request.clone({
            headers: request.headers.set("Accept", "application/json")
        });
        return next.handle(request)
            .pipe(
                catchError((errorResponse) => {

                    if (errorResponse instanceof HttpErrorResponse && errorResponse.status == 401) {
                        this.authService.wrongAuthData(errorResponse.error.result);
                    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status !== 406) {
                        let errMsg: string;
                        const err = errorResponse.message || JSON.stringify(errorResponse.error);
                        errMsg = `${errorResponse.status} - ${errorResponse.statusText || ''} Details: ${err}`;

                        this.alertService.show({
                            message: errMsg,
                            alertType: "danger",
                            destroy: false
                        });
                        return throwError(errMsg);
                    }
                    return throwError(errorResponse);

                })
            );

    }
}


export const HttpConfigInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
};
