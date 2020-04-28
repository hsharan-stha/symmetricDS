import {Component, OnInit} from '@angular/core';
import {TableTriggersService} from "../services/table-triggers.service";
import {columnsList} from "../cols.table";
import {ChannelService} from "../../channels/services/channel.service";
import {Constant} from "../data/constant-value.enum";

@Component({
    selector: 'app-tabletriggers',
    templateUrl: './tabletriggers.component.html',
    styleUrls: ['./tabletriggers.component.css']
})
export class TabletriggersComponent implements OnInit {

    showDialog = false;
    tableTriggerData;
    selectedID;
    buttonDisabledClass: string = Constant.UNCLICKABLE;
    subText: string;
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
    filterField: object;
    alertType: string;
    page: number = 1;


    constructor(private tableTriggerService: TableTriggersService,
                private channelService: ChannelService
    ) {
    }

    ngOnInit() {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };

        this.columnsList = columnsList;
        this.filterField = ['id', 'source_table_name', 'channel_id'];

        this.getTableTrigger(this.meta);
        this.tableTriggerService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getTableTrigger(meta);
                if (message == Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );

        this.getChannelIdColumn();
        this.getReloadChannelIdColumn();
    }

    getTableTrigger(meta): void {
        this.table_loader = true;
        this.tableTriggerService.get(meta).subscribe(
            data => {
                this.tableTriggerData = data;
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
        this.getTableTrigger(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getTableTrigger(meta);
    }

    getChannelIdColumn(): void {
        this.channelService.getByChannelId().subscribe(
            data => {
                this.channelService.setChannelID(data);
            }
        );
    }

    getReloadChannelIdColumn(): void {
        this.channelService.getByReloadChannelId().subscribe(
            data => {
                this.channelService.setReloadChannelID(data['name']);
            }
        );
    }
}
