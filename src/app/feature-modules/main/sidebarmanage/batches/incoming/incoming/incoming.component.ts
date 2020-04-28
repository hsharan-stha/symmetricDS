import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {from, interval} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {IncomingService} from './../services/incoming.service';
import {ChannelService} from '@sidebarconfigure/channels/services/channel.service';
import {ChannelDropdown} from '@sidebarconfigure/channels/model/channel-dropdown';
import {StatusService} from './../../shared/services/status.service';
import {ColsList} from './../cols.table';
import {AlertMessageService} from '@shared/services/alert-message.service';
import {API} from "@config/url";
import {ServerNameService} from "@shared/services/server-name.service";

@Component({
    selector: 'app-incoming-batches',
    templateUrl: './incoming.component.html',
    styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit, OnDestroy {

    query;

    channels: ChannelDropdown[];

    incomingBatches;

    statusValues;

    filterForm: FormGroup;

    columnList;

    table_loader: boolean = false;

    selectedRowIds: string[];

    inProcess: boolean = false;

    haveAnyStatusER: boolean;

    disableClearCacheButton: boolean = true;

    auto_refresh;

    disableCh: boolean;

    constructor(
        private service: IncomingService,
        private channelService: ChannelService,
        private fb: FormBuilder,
        private statusService: StatusService,
        private alertMessage: AlertMessageService,
        private role: ServerNameService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.columnList = ColsList;
        this.query = {
            sort_by: 'batch_id',
            sort_order: 'asc',
            page: 1
        }
        this.getData();

        this.channelService.getByChannelId().subscribe(
            (data) => {
                data.unshift(new ChannelDropdown("", "<Any>"));
                this.channels = data;

            }
        );

        this.statusService.getList().subscribe(
            (data) => this.statusValues = data
        );
        this.checkPermission();


    }

    checkPermission(): void {
        let role = this.role.getRole();
        switch (role) {
            case API.read:
                this.disableCh = true;
                break;
        }
    }

    getChannelID(id): void {
        this.filterForm.get('channel_id').setValue(id);
        this.getData();
    }

    getStatusID($event): void {
        let status = $event.currentTarget.value;
        this.filterForm.get('status').setValue(status);
        this.getData();
    }

    createForm() {
        this.filterForm = this.fb.group({
            channel_id: [""],
            status: [""]
        })
    }

    getData() {
        this.selectedRowIds = [];
        this.disabledAllChangeButton();
        this.table_loader = true;
        this.service.getData(this.query, this.filterForm.value).subscribe(
            (data) => {
                this.table_loader = false;
                this.incomingBatches = data;
            }
        );
    }

    sortEvent($event) {
        this.query = {
            sort_by: $event.sort_by,
            sort_order: $event.sort_order,
            page: this.query.page
        };
        this.getData();
    }

    pageNumber($event) {
        this.query.page = $event;
        this.getData();
    }

    rowSelected($event) {
        this.selectedRowIds = $event;

        this.checkIfStatusHasValueER();

    }

    disabledAllChangeButton() {
        this.haveAnyStatusER = false;
        this.disableClearCacheButton = true;
    }

    errorInHttp(errorMessage) {
        this.alertMessage.show({
            message: errorMessage,
            alertType: "danger"
        });
        this.table_loader = this.inProcess = false;
        this.getData();
    }

    checkIfStatusHasValueER() {

        if (this.selectedRowIds.length > 0) {
            this.disableClearCacheButton = false;
            for (let i = 0; i < this.selectedRowIds.length; i++) {

                for (let j = 0; j < this.incomingBatches.length; j++) {
                    if (this.incomingBatches[j].batch_id == this.selectedRowIds[i] && this.incomingBatches[j].status == "ER") {
                        this.haveAnyStatusER = true;
                        break;
                    }
                    this.haveAnyStatusER = false;
                }

                if (this.haveAnyStatusER)
                    break;
            }
        } else {
            this.disabledAllChangeButton();
        }
    }


    ignoreBatch() {
        if (this.disableCh) {
            return false;
        }

        let selectedRows = [];

        for (let i = 0; i < this.selectedRowIds.length; i++) {
            for (let j = 0; j < this.incomingBatches.length; j++) {
                if (this.incomingBatches[j].batch_id == this.selectedRowIds[i]) {
                    if (this.incomingBatches[j].status == "ER") {
                        this.incomingBatches[j].status = "IG";
                        selectedRows.push(this.incomingBatches[j]);
                    }


                }
            }
        }

        let currentId;

        from(selectedRows).pipe(
            tap((data) => {
                this.table_loader = true;
                this.inProcess = true;
                return data;
            }),
            concatMap((map) => {
                currentId = map;
                return this.service.ignoreBatch(map)
            })
        ).subscribe(
            (data) => {
                //if(data.responceCode == 0 && data.result == true){

                this.alertMessage.cancel();
                this.alertMessage.show({
                    message: 'Clear stagging of row having batch id ' + currentId.batch_id,
                    alertType: 'success'
                })
                //}
            },
            (error) => {
                if (error.error) {
                    this.errorInHttp(error.error.result);
                }
            },
            () => {
                this.inProcess = false;
                this.alertMessage.show({
                    message: "Clear stagging of row has been completed.",
                    alertType: 'success'
                });
                this.table_loader = false;
                this.getData();
            }
        );
    }

    clearBatch() {
        if (this.disableCh) {
            return false;
        }
        let selectedRows = [];

        for (let i = 0; i < this.selectedRowIds.length; i++) {
            for (let j = 0; j < this.incomingBatches.length; j++) {
                if (this.incomingBatches[j].batch_id == this.selectedRowIds[i]) {
                    this.incomingBatches[j].status = "OK";
                    selectedRows.push(this.incomingBatches[j]);
                }
            }
        }

        let currentId;

        from(selectedRows).pipe(
            tap((data) => {
                this.table_loader = true;
                this.inProcess = true;
                return data;
            }),
            concatMap((map) => {
                currentId = map;
                return this.service.ignoreBatch(map)
            })
        ).subscribe(
            (data) => {
                //if(data.responceCode == 0 && data.result == true){

                this.alertMessage.cancel();
                this.alertMessage.show({
                    message: 'Clear stagging of row having batch id ' + currentId.batch_id,
                    alertType: 'success'
                })
                //}
            },
            (error) => {
                if (error.error) {
                    this.errorInHttp(error.error.result);
                }
            },
            () => {
                this.inProcess = false;
                this.alertMessage.show({
                    message: "Clear stagging of row has been completed.",
                    alertType: 'success'
                });
                this.table_loader = false;
                this.getData();
            }
        );
    }


    clearTableCache() {
        if (this.disableCh) {
            return false;
        }
        let currentId;

        from(this.selectedRowIds).pipe(
            tap((data) => {
                this.table_loader = true;
                this.inProcess = true;
                return data;
            }),
            concatMap((map) => {
                currentId = map;
                return this.service.clearTableCache(map);
            })
        ).subscribe(
            (data) => {
                //if(data.responceCode == 0 && data.result == true){

                this.alertMessage.cancel();
                this.alertMessage.show({
                    message: 'Clearing table cahce of row having batch id ' + currentId,
                    alertType: 'success'
                })
                //}
            },
            (error) => {
                if (error.error) {
                    this.errorInHttp(error.error.result);
                }
            },
            () => {
                this.inProcess = false;
                this.alertMessage.show({
                    message: "Clearing table cahce of row has been completed.",
                    alertType: 'success'
                });
                this.table_loader = false;
                this.getData();
            }
        );

    }

    clearStaging() {
        if (this.disableCh) {
            return false;
        }
        let currentId;

        from(this.selectedRowIds).pipe(
            tap((data) => {
                this.table_loader = true;
                this.inProcess = true;
                return data;
            }),
            concatMap((map) => {
                currentId = map;
                return this.service.clearStaging(map)
            })
        ).subscribe(
            (data) => {
                //if(data.responceCode == 0 && data.result == true){

                this.alertMessage.cancel();
                this.alertMessage.show({
                    message: 'Clear stagging of row having batch id ' + currentId,
                    alertType: 'success'
                });
                //}
            },
            (error) => {
                if (error.error) {
                    this.errorInHttp(error.error.result);
                }
            },
            () => {
                this.inProcess = false;
                this.alertMessage.show({
                    message: "Clear stagging of row has been completed.",
                    alertType: 'success'
                });
                this.table_loader = false;
                this.getData();
            }
        );
    }

    autoRefreshChange($event) {
        if ($event.target.checked) {
            this.auto_refresh = interval(2000).subscribe(
                () => {
                    this.getData();
                }
            );

        } else {
            this.auto_refresh.unsubscribe();
        }
    }

    ngOnDestroy() {
        if (this.auto_refresh)
            this.auto_refresh.unsubscribe();
    }

}
