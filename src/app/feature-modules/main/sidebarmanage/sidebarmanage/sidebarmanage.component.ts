import {Component, OnInit} from '@angular/core';
import { SidebarService } from '@shared/sidebar/sidebar.service';

@Component({
    selector: 'app-sidebarmanage',
    templateUrl: './sidebarmanage.component.html',
    styleUrls: ['./sidebarmanage.component.css']
})
export class SidebarmanageComponent implements OnInit {

    sidebarArray: any;

    sidebarToggled ; 

    constructor(private sidebarService : SidebarService) {
    }

    ngOnInit() {
        this.sidebarArray = [
            {
                name: "Nodes",
                path: "/main/manage/nodes"
            },
            {
                name: "Installed Trigger",
                path: "/main/manage/installed-trigger"
            },
            {
                name: "Outgoing Batches",
                path: "/main/manage/outgoing-batches"
            },
            {
                name: "Incoming Batches",
                path: "/main/manage/incoming-batches"
            },
            {
                name: "Logging",
                path: "/main/manage/logging"
            }
        ]

     
    }

}
