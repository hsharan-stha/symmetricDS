import {Component, OnInit} from '@angular/core';
// import { Title }     from '@angular/platform-browser';

import {GroupLinksService} from './../../group-links/services/group-links.service';
import {RoutersService} from './../services/routers.service';
import {NodeGroupIdService} from './../services/node-group-id.service';
import {RouterColsList, DisplayedRouterColsList} from './../cols.table';


import {AlertMessageService} from '@shared/services/alert-message.service';
// import { PageTitle } from './../data/page-title.enum';
import {Messages} from './../data/message.enum';
import {Button} from './../data/button.enum';


@Component({
    selector: 'app-routers',
    templateUrl: './routers.component.html',
    styleUrls: ['./routers.component.css']
})
export class RoutersComponent implements OnInit {

    createPath: string;

    editpath: string;

    deletePath: string;

    showCreateForm: boolean = false;

    /**
     * List of cols to be displayed in table
     *
     * @type array
     */
    colsList: any;


    totalColsList: any;

    /**
     * Determine whether to show loader or not
     *
     * @type {boolean}
     */
    table_loader: boolean = true;

    /**
     * Value type in search box
     *
     * @type { string}
     */
    subText: string;

    filterField: string[];

    selectedId: string;

    crudButtonClass: string = "unclickable";

    routersData: any;


    meta;

    pagination: boolean;

    constructor(
        private service: RoutersService,
        private groupLinkService: GroupLinksService,
        private nodeGroupIdService: NodeGroupIdService
    ) {
    }

    ngOnInit() {

        // this.setPageTitle();


        this.colsList = DisplayedRouterColsList;
        this.totalColsList = RouterColsList;

        this.meta = {
            sort_by: 'router_id',
            sort_order: 'asc',
            page: 1
        };
        this.getData();


        this.createPath = "/main/configure/routers/create";

        this.filterField = [
            "router_id",
            "source_node_group_id",
            "target_node_group_id"
        ];


        this.service.message.subscribe(
            (data) => {
                let notToFetched = ["cancel", "default"];
                if (notToFetched.indexOf(data) < 0) {
                    // this.setPageTitle();
                    this.getData();

                    this.crudButtonClass = "unclickable";

                }
                // this.setPageTitle();
            }
        )

        this.getGroupLinks();

    }

    /**
     * Set a page title
     *
     * @return void
     */
    // setPageTitle() : void {
    //     this.titleService.setTitle(PageTitle.GET);
    // }


    getData() {

        this.service.get(this.meta).subscribe(
            (data) => {
                this.routersData = data;
                this.table_loader = false;
                this.pagination = true;
            }
        )
    }

    /**
     * Sear a value type in search box
     *
     * @param $event
     */
    searchValue($event) {
        this.subText = $event;
    }

    /**
     * Selected row
     *
     * @param $event
     */
    rowSelected($event) {
        this.selectedId = $event;
        this.editpath = "/main/configure/routers/" + this.selectedId + "/edit";
        this.deletePath = "/main/configure/routers/" + this.selectedId + "/delete";
        this.crudButtonClass = "clickable";
    }

    sortEvent($event) {
        this.crudButtonClass = "unclickable";
        this.meta.sort_order = $event.sort_order;
        this.meta.sort_by = $event.sort_by;
        this.getData();
    }

    getGroupLinks() {
        this.groupLinkService.getColumn().subscribe(
            (data) => {
                this.nodeGroupIdService.changeData(data['result']);
            }
        )
    }

    pageNumber($event) {
        this.crudButtonClass = "unclickable";
        this.table_loader = true;
        this.meta.page = $event;
        this.getData();
    }
}
