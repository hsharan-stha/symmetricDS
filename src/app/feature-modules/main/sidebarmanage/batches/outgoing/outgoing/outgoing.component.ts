import {Component, OnInit, HostListener, OnDestroy, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {OutgoingService} from './../services/outgoing.service';
import {ColsList} from './../cols.table';
import {FormBuilder, FormGroup} from '@angular/forms';
import {from, interval} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {ChannelService} from '@sidebarconfigure/channels/services/channel.service';
import {ChannelDropdown} from '@sidebarconfigure/channels/model/channel-dropdown';
import {StatusService} from './../services/status.service';
import {AlertMessageService} from '@shared/services/alert-message.service';
import {API} from "@config/url";
import {ServerNameService} from "@shared/services/server-name.service";

@Component({
    selector: 'app-outgoing',
    templateUrl: './outgoing.component.html',
    styleUrls: ['./outgoing.component.css']
})
export class OutgoingComponent implements OnInit, OnDestroy, AfterViewInit {


    filterForm: FormGroup;

    datas;

    columnList;

    statusValues;

    channels;

    meta;

    inProcess: boolean = false;

    selectedRowIds: string[];

    table_loader: boolean;

    haveAnyStatusER: boolean = false;

    disableClearCacheButton: boolean = true;

    auto_refresh;

    disableCh: boolean;

    constructor(
        private fb: FormBuilder,
        private service: OutgoingService,
        private statusService: StatusService,
        private channelServie: ChannelService,
        private router: Router,
        private alertMessage: AlertMessageService,
        private role: ServerNameService
    ) {

    }

    ngOnInit() {
        this.meta = {
            sort_by: 'batch_id',
            sort_order: 'asc',
            page: 1
        };

        this.createFilterForm();
        this.getStatus();

        this.columnList = ColsList;

        this.getData();
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

    ngAfterViewInit(): void {
        this.loadChannel();
    }

    loadChannel() {
        this.channelServie.getByChannelId().subscribe(
            (data) => {

                data.unshift(new ChannelDropdown("", "<Any>"));
                this.channels = data;

            }
        );
    }

    @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
        if (this.inProcess) {
            event.preventDefault();
            event.returnValue = false;
        }

    }

    /**
     * Get a status list
     *
     * @return void
     */
    getStatus(): void {
        this.statusService.getList().subscribe(
            (data) => this.statusValues = data
        )
    }

    /**
     * Create a filter form
     *
     * @return void
     */
    createFilterForm(): void {
        this.filterForm = this.fb.group({
            channel_id: [""],
            status: [""]
        });
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

    getData() {
        this.selectedRowIds = [];
        this.disabledAllChangeButton();
        this.table_loader = true;
        this.service.getData(this.meta, this.filterForm.value).subscribe(
            (data) => {
                this.datas = data,
                    this.table_loader = false;
            }
        );
    }

    sortEvent($event) {
        this.meta = {
            sort_by: $event.sort_by,
            sort_order: $event.sort_order,
            page: this.meta.page
        };
        this.getData();
    }


    pageNumber($event) {
        this.meta.page = $event;
        this.getData();
    }

    changeValue($event) {
        if ($event.target.value == "staging") {
            this.clearStaging();
        }
    }


    rowSelected($event) {
        this.selectedRowIds = $event;
        console.log($event)
        this.checkIfStatusHasValueER();

    }

    disabledAllChangeButton() {
        this.haveAnyStatusER = false;
        this.disableClearCacheButton = true;
    }

    checkIfStatusHasValueER() {

        if (this.selectedRowIds.length > 0) {
            this.disableClearCacheButton = false;
            for (let i = 0; i < this.selectedRowIds.length; i++) {

                for (let j = 0; j < this.datas.length; j++) {
                    if (this.datas[j].batch_id == this.selectedRowIds[i] && this.datas[j].status == "ER") {
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
            for (let j = 0; j < this.datas.length; j++) {
                if (this.datas[j].batch_id == this.selectedRowIds[i]) {
                    selectedRows.push(this.datas[j]);
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
                if (data['responceCode'] == 0 && data['result'] === true) {

                    this.alertMessage.cancel();
                    this.alertMessage.show({
                        message: 'Clear stagging of row having batch id ' + currentId.batch_id,
                        alertType: 'success'
                    })
                }
            },
            (error) => {
                this.errorInHttp(error.error.result);
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
                return this.service.clearTableCache(map)
            })
        ).subscribe(
            (data) => {
                if (data['responceCode'] == 0 && data['result'] === true) {

                    this.alertMessage.cancel();
                    this.alertMessage.show({
                        message: 'Clearing table cahce of row having batch id ' + currentId,
                        alertType: 'success'
                    })
                }
            },
            (error) => {
                this.errorInHttp(error.error.result);
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
                if (data['responceCode'] === 0 && data['result'] === true) {

                    this.alertMessage.cancel();
                    this.alertMessage.show({
                        message: 'Clear stagging of row having batch id ' + currentId,
                        alertType: 'success'
                    })
                }
            },
            (error) => {
                if(error.error){
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

    errorInHttp(errorMessage){
        this.alertMessage.show({
            message : errorMessage ,
            alertType : "danger"
        });
        this.table_loader = this.inProcess  = false ; 
        this.getData();
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
