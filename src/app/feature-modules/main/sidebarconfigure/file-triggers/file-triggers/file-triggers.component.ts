import {Component, OnInit} from '@angular/core';
import {FileTriggersService} from "../services/file-triggers.service";
import {columnsList} from "../cols.table";
import {Constant} from "../data/constant-value.enum";
import {ChannelService} from "../../channels/services/channel.service";

@Component({
    selector: 'app-file-triggers',
    templateUrl: './file-triggers.component.html',
    styleUrls: ['./file-triggers.component.css']
})
export class FileTriggersComponent implements OnInit {
    fileTriggerTableData;
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


    constructor(private fileTriggersService: FileTriggersService,
                private channelService: ChannelService) {
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

        this.getFileTriggers(this.meta);
        this.fileTriggersService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getFileTriggers(meta);
                if (message === Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );
        this.getChannelIdColumn();
        this.getReloadChannelIdColumn();
    }

    getFileTriggers(meta): void {
        this.table_loader = true;
        this.fileTriggersService.get(meta).subscribe(
            data => {
                this.fileTriggerTableData = data;
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
        this.getFileTriggers(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getFileTriggers(meta);
    }


    getChannelIdColumn(): void {
        this.channelService.getByChannelId().subscribe(
            data => {
                this.channelService.setChannelID(data);
            }
        );
    }

    getReloadChannelIdColumn(): void {
        this.channelService.getByReloadChannelIdWithISFile().subscribe(
            data => {
                this.channelService.setReloadChannelID(data.name);
            }
        );
    }
}
