import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ServerNameService} from "@shared/services/server-name.service";
import {API} from "@config/url";
import {AlertMessageService} from "@shared/services/alert-message.service";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {


    constructor(private router: Router, private role: ServerNameService, private alertService: AlertMessageService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.role.setRole();

        if (this.role.getRole() === next.data.role || this.role.getRole() === next.data.role2 || this.role.getRole() === next.data.role3) {
            return true;
        }


        // navigate after not found
        this.alertService.show({
            message: "You don't have permission",
            alertType: "danger"
        });
        this.router.navigate([API.dashboard]);
        return false;
    }

}