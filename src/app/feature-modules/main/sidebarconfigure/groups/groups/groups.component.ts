import {Component, OnInit} from '@angular/core';
import {GroupService} from "../service/group.service";
import {columnsList} from "../cols.table";
import {Constant} from "../data/constant-value.enum";


@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
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

    constructor(private groupService: GroupService) {
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
        this.getGroup(this.meta);
        this.groupService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getGroup(meta);
                if (message === Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );
    }

    getGroup(meta): void {
        this.table_loader = true;
        this.groupService.get(meta).subscribe(
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
        this.getGroup(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getGroup(meta);
    }
}
