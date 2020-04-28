import {Injectable} from '@angular/core';
import {Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    /**
     * Set message and router navigate
     *
     * @returns {boolean}
     */
    private setMsgAndNavigate() {

        this.authService.setMessage("Session Expired");
        this.router.navigate(['login']);
        return false;
    }

    canLoad(route: Route): boolean {

        if (this.authService.isUserLoggedIn())
            return true;

        return this.setMsgAndNavigate();
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isUserLoggedIn())
            return true;

        return this.setMsgAndNavigate();
    }

}