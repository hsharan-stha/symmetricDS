import {Component, OnInit} from '@angular/core';
import {Constant} from "../data/constant-value.enum";
import {FileRoutingService} from "../services/file-routing.service";
import {columnsList} from "../cols.table";
import {FileTriggersService} from "../../file-triggers/services/file-triggers.service";
import {RoutersService} from "../../routers/services/routers.service";

@Component({
    selector: 'app-file-routing',
    templateUrl: './file-routing.component.html',
    styleUrls: ['./file-routing.component.css']
})
export class FileRoutingComponent implements OnInit {

    fileRoutingTableData;
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


    constructor(private fileRoutingService: FileRoutingService,
                private fileTriggerService: FileTriggersService,
                private routerService: RoutersService) {
    }

    ngOnInit() {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.filterField = [
            Constant.FILTER_BY
        ];
        this.columnsList = columnsList;

        this.getFileRouting(this.meta);
        this.fileRoutingService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getFileRouting(meta);
                if (message === Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );

        this.getFileTriggerIdColumn();
        this.getRoutersIdColumn();

    }

    getFileRouting(meta): void {
        this.table_loader = true;
        this.fileRoutingService.get(meta).subscribe(
            data => {
                this.fileRoutingTableData = data;
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
        this.getFileRouting(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getFileRouting(meta);
    }

    getFileTriggerIdColumn(): void {
        this.fileTriggerService.getByFileTriggerID().subscribe(
            data => {
                this.fileTriggerService.setFileTriggerID(data.data);
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
