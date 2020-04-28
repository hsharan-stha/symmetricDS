import {Component, OnInit} from '@angular/core';
import {Constant} from "@sidebarmanage/installed-trigger/data/constant-value.enum";
import {columnsList} from "@sidebarmanage/installed-trigger/cols.table";
import {InstalledTriggerService} from "@sidebarmanage/installed-trigger/services/installed-trigger.service";

@Component({
    selector: 'app-installed-trigger',
    templateUrl: './installed-trigger.component.html',
    styleUrls: ['./installed-trigger.component.css']
})
export class InstalledTriggerComponent implements OnInit {

    /** installed trigger data */
    installedTriggerData;


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
    buttonDisabledClass: string = Constant.CLICKABLE;

    /**
     reload and drop
     prevent click
     */
    rebuildOrDrop: string = Constant.UNCLICKABLE;

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


    /**
     for
     design of table
     according to manage tab

     if(mode===configure) no checkbox reqiure
     else if(mode===manage) required checkbox
     */
    mode: string = Constant.CONFIGURE;


    /**
     to check whether
     show_sym_triggers
     checked or not
     */
    show_sym_triggers: boolean = false;

    constructor(private installedTriggerService: InstalledTriggerService) {
    }

    ngOnInit() {
        this.setMeta();
        this.columnsList = columnsList;
        this.getInstalledTrigger(this.meta);
        this.filterField = ['trigger_id', 'source_table_name', 'source_catalog_name'];

    }

    setMeta(): void {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page,
            showSymTrigger: this.show_sym_triggers
        };
    }

    getInstalledTrigger(meta): void {
        this.table_loader = true;
        this.installedTriggerService.get(meta).subscribe(
            data => {
                this.installedTriggerData = data;
                this.table_loader = false;
                this.pagination = true;
                if (this.show_sym_triggers) {
                    this.mode = Constant.CONFIGURE;
                    this.rebuildOrDrop = Constant.UNCLICKABLE;
                } else {
                    this.mode = Constant.MANAGE;
                }
            }
        );
    }

    setShowSymTriggers($value) {
        this.show_sym_triggers = $value;
        this.setMeta();
        this.getInstalledTrigger(this.meta);
    }

    search($event) {
        this.subText = $event;
    }

    sortEvent($event) {
        this.rebuildOrDrop = Constant.UNCLICKABLE;
        this.sort_order = $event.sort_order;
        this.sort_by = $event.sort_by;
        this.setMeta();
        this.getInstalledTrigger(this.meta);
    }

    pageNumber($event) {
        this.rebuildOrDrop = Constant.UNCLICKABLE;
        this.page = $event;
        this.setMeta();
        this.getInstalledTrigger(this.meta);
    }

    totalSelectedTables($event) {
        this.rebuildOrDrop = $event.hasOwnProperty(0) ? Constant.CLICKABLE : Constant.UNCLICKABLE;
        this.selectedId = $event;
    }

    /**
     from button bat
     get table_loader value
     */
    Loading($event) {
        this.table_loader = $event;
    }

    /**
     for refresh button
     */
    refreshData($event) {
        if ($event) {
            // location.reload();
            this.rebuildOrDrop = Constant.UNCLICKABLE;
            this.setMeta();
            this.getInstalledTrigger(this.meta);
            // alert(JSON.stringify(this.meta));
        }
    }
}
