import {Component, OnInit} from '@angular/core';
import {TableRoutingService} from "../services/table-routing.service";
import {columnsList} from "../cols.table";
import {TableTriggersService} from "../../tabletriggers/services/table-triggers.service";
import {RoutersService} from "../../routers/services/routers.service";
import {Constant} from "../data/constant-value.enum";

@Component({
    selector: 'app-tablerouting',
    templateUrl: './tablerouting.component.html',
    styleUrls: ['./tablerouting.component.css']
})
export class TableroutingComponent implements OnInit {
    tableRoutingData;
    selectedID;
    buttonDisabledClass: string = Constant.UNCLICKABLE;
    subText: string;
    filterField: object;
    path: string = Constant.PATH;
    createpath: string = this.path + Constant.CREATE;
    editpath: string;
    deletepath: string;
    columnsList;
    table_loader: boolean;
    pagination: boolean;
    sort_order: string = Constant.SORT_ORDER;
    sort_by: string = Constant.SORT_BY;
    meta;
    message: string;
    alertType: string;
    page: number = 1;

    constructor(
        private tableRoutingService: TableRoutingService,
        private tableTriggerService: TableTriggersService,
        private routerService: RoutersService) {
    }

    ngOnInit() {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.filterField = ['trigger_id'];
        this.columnsList = columnsList;

        this.getTableRouting(this.meta);
        this.tableRoutingService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getTableRouting(meta);
                if (message == Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );

        this.getTriggerIdColumn();
        this.getRoutersIdColumn();
    }

    getTableRouting(meta): void {
        this.table_loader = true;
        this.tableRoutingService.get(meta).subscribe(
            data => {
                this.tableRoutingData = data;
                this.table_loader = false;
                this.pagination = true;
            }
        );
    }

    rowClick($id) {
        this.selectedID = $id;
        this.editpath = this.path + '/' + $id + Constant.EDIT;
        this.deletepath = this.path + '/' + $id + Constant.DELETE;
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
        this.getTableRouting(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getTableRouting(meta);
    }

    getTriggerIdColumn(): void {
        this.tableTriggerService.getByTriggerID().subscribe(
            (data) => {
                this.tableTriggerService.setTriggerID(data.data);
            }
        );
    }

    getRoutersIdColumn(): void {
        this.routerService.getByRouterID().subscribe(
            (data) => {
                this.routerService.setRouterID(data.name);
            }
        );
    }

}
