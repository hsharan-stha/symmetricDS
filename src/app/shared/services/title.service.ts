import {Injectable} from '@angular/core';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ServerNameService} from "@shared/services/server-name.service";
import {API} from "@config/url";

const APP_TITLE = 'Symmetric DS!';
const SEPARATOR = ' > ';

@Injectable()
export class TitleService {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private serverName: ServerNameService
    ) {
    }

    init() {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .map((data) => {
                if (data.title) {
                    // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
                    return data.title;
                } else {
                    // If not, we do a little magic on the url to create an approximation
                    return this.router.url.split('/').reduce((acc, frag) => {
                        if (acc && frag) {
                            acc += SEPARATOR;
                        }
                        return acc + TitleService.ucFirst(frag);
                    });
                }
            })
            // .subscribe((pathString) => this.titleService.setTitle(`${APP_TITLE} ${pathString}`));
            .subscribe((pathString) => {
                this.titleService.setTitle(` ${pathString}`);
                this.serverName.setServer();
                this.serverName.setRole();

            });
    }

    static ucFirst(string) {
        if (!string) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}