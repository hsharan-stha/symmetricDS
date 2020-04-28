import {Injectable} from '@angular/core';
import {Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {API} from "@config/url";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    canLoad(route: Route): boolean {
        if (this.authService.isUserLoggedIn()) {
            this.router.navigateByUrl(API.dashboard);
            return false;
        }

        return true;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.authService.isUserLoggedIn()) {
            this.router.navigateByUrl(API.dashboard);
            return false;
        }

        return true;

    }

}