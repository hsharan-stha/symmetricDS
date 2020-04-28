import {Component, OnInit} from '@angular/core';
import {Constant} from "@sidebarmanage/nodes/data/constant-value.enum";
import {NodesService} from "@sidebarmanage/nodes/services/nodes.service";
import {columnsList} from "@sidebarmanage/nodes/cols.table";
import {controlData, registrationData} from "@sidebarmanage/nodes/data/buttons-dropdown";
import {ServerNameService} from "@shared/services/server-name.service";

@Component({
    selector: 'app-nodes',
    templateUrl: './nodes.component.html',
    styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {
    /** nodes data */
    nodesData;

    /** list of
     * control buttons
     */
    controlData = [];

    /**
     list of
     registration buttons

     */
    registrationData = [];

    /**
     to know
     selected table row
     */
    selectedId;

    /**
     to filter
     table data
     */
    subText: string;

    /**
     filter by
     column name
     */
    filterField: object;

    /**
     prevent click
     */
    buttonDisabledClass: string = Constant.UNCLICKABLE;

    /**
     url path
     */
    path: string = Constant.PATH;

    /**
     table thead
     */
    columnsList;

    /**
     loader true or false
     */
    table_loader: boolean;

    /**
     pagination true or false
     */
    pagination: boolean;


    /**
     ascending or descending
     */
    sort_order: string = Constant.SORT_ORDER;

    /**
     table column name
     */
    sort_by: string = Constant.SORT_BY;

    /**
     current page number
     */
    page: number = 1;

    /**
     object stores
     sort order,
     sort by,
     page
     */
    meta;


    constructor(
        private nodesService: NodesService,
        private serverName: ServerNameService
    ) {
    }

    ngOnInit() {
        // this.serverName.setServer();
        this.setMeta();
        this.columnsList = columnsList;
        this.getNodes(this.meta);
        this.filterField = ['node_id', 'node_group_id', 'external_id'];
        this.controlData = controlData;
        this.registrationData = registrationData;
    }

    setMeta(): void {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
    }

    getNodes(meta): void {
        this.table_loader = true;
        this.nodesService.get(meta).subscribe(
            data => {
                this.nodesData = data;
                this.table_loader = false;
                // this.tableHeaderLoader = false;
                this.pagination = true;
                // this.nodesService.setNodesData(data);
            }
        );
    }

    rowClick($id) {
        this.selectedId = $id;
        this.buttonDisabledClass = Constant.CLICKABLE;
    }

    search($event) {
        this.subText = $event;
    }

    sortEvent($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.sort_order = $event.sort_order;
        this.sort_by = $event.sort_by;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.getNodes(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getNodes(meta);
    }
}
