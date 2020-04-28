import {Component, OnInit} from '@angular/core';
import {ChannelService} from "../services/channel.service";
import {columnsList} from "../cols.table";
import {Constant} from "../data/constant-value.enum";


@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
    channelTableData;
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


    constructor(private channelService: ChannelService) {
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

        this.getChannel(this.meta);
        this.channelService.getMessage().subscribe(
            (message) => {
                let meta = {
                    sort_by: this.sort_by,
                    sort_order: this.sort_order,
                    page: this.page
                };
                this.getChannel(meta);
                if (message === Constant.UNCLICKABLE) {
                    this.buttonDisabledClass = Constant.UNCLICKABLE;
                }
            }
        );
    }

    getChannel(meta): void {
        this.table_loader = true;
        this.channelService.get(meta).subscribe(
            data => {
                this.channelTableData = data;
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
        this.getChannel(meta);
    }

    pageNumber($event) {
        this.buttonDisabledClass = Constant.UNCLICKABLE;
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getChannel(meta);
    }
}
