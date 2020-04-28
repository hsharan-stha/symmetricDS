import {Component, OnInit} from '@angular/core';
import {Constant} from "@sidebarconfigure/transform-table/data/constant-value.enum";
import {TransformTableService} from "@sidebarconfigure/transform-table/service/transform-table.service";
import {columnsList} from "@sidebarconfigure/transform-table/cols.table";
import {GroupLinksService} from "@sidebarconfigure/group-links/services/group-links.service";
import {NodeGroupIdService} from "@sidebarconfigure/routers/services/node-group-id.service";

@Component({
    selector: 'app-transform-table',
    templateUrl: './transform-table.component.html',
    styleUrls: ['./transform-table.component.css']
})
export class TransformTableComponent implements OnInit {

    showDialog = false;
    tableData;
    selectedId;
    buttonDisabledClass: string = Constant.UNCLICKABLE;
    subText: string;
    filterField: object;
    path: string = Constant.PATH;
    createpath: string = this.path + Constant.CREATE;
    editpath: string;
    deletepath: string;
    columnsList;
    table_loader: boolean;
    // tableHeaderLoader: boolean;
    pagination: boolean;
    sort_order: string = Constant.SORT_ORDER;
    sort_by: string = Constant.SORT_BY;
    meta;
    page: number = 1;

    constructor(private transformTableService: TransformTableService,
                private groupLinkService: GroupLinksService,
                private nodeGroupIdService: NodeGroupIdService
    ) {
    }

    ngOnInit() {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.filterField = [
            Constant.FILTER_BY,
            Constant.FILTER_BY1,
            Constant.FILTER_BY2
        ];
        this.columnsList = columnsList;
        this.getTransformTable(this.meta);
        this.transformTableService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getTransformTable(meta);
                if (message === Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );
        this.getGroupLinks();
    }

    getTransformTable(meta): void {
        this.table_loader = true;
        this.transformTableService.get(meta).subscribe(
            data => {
                this.tableData = data;
                this.table_loader = false;
                this.pagination = true;
            }
        );
    }

    rowClick($id) {
        this.selectedId = $id;
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
        this.getTransformTable(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getTransformTable(meta);
    }

    getGroupLinks() {
        this.groupLinkService.getColumn().subscribe(
            (data) => {
                this.nodeGroupIdService.changeData(data['result']);
            }
        )
    }

}
