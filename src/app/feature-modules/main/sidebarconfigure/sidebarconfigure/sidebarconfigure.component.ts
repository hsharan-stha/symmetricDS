import {Component, OnInit} from '@angular/core';
import {SidebarService} from '@shared/sidebar/sidebar.service';

@Component({
    selector: 'app-sidebarconfigure',
    templateUrl: './sidebarconfigure.component.html',
    styleUrls: ['./sidebarconfigure.component.css'],
    styles: [`
        :host {
            display: flex;
            width: 100%;
        }
    `]
})
export class SidebarconfigureComponent implements OnInit {

    sidebarArray: any;

    constructor() {
    }

    ngOnInit() {
        this.sidebarArray = [

            {
                name: "Groups",
                path: "/main/configure/groups"
            },

            {
                name: "Group Links",
                path: "/main/configure/group-links"
            },
            {
                name: "Routers",
                path: "/main/configure/routers"
            },

            {
                name: "Channels",
                path: "/main/configure/channels"
            },

            {
                name: "Table Triggers",
                path: "/main/configure/table-triggers"
            },

            {
                name: "Table Routing",
                path: "/main/configure/table-routing"
            },
            {
                name: "File Triggers",
                path: "/main/configure/file-triggers"
            },
            {
                name: "File Routing",
                path: "/main/configure/file-routing"
            },
            {
                name: "Transform Table",
                path: "/main/configure/transform-table"
            },
            {
                name: "Transform Column",
                path: "/main/configure/transform-column"
            },
            {
                name: "Parameter",
                path: "/main/configure/parameters"
            },

            {
                name: "User",
                path: "/main/configure/user"
            }
        ];

    }

}
