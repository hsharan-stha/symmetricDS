import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {$e} from "codelyzer/angular/styles/chars";
import {Constant} from "@sidebarmanage/installed-trigger/data/constant-value.enum";
import {InstalledTriggerService} from "@sidebarmanage/installed-trigger/services/installed-trigger.service";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {ServerNameService} from "@shared/services/server-name.service";
import {API} from "@config/url";

@Component({
    selector: 'app-buttonbar-installed-trigger',
    templateUrl: './buttonbar.component.html',
    styleUrls: ['./buttonbar.component.css']
})
export class ButtonbarComponent implements OnInit {
    @Output() searchBoxData = new EventEmitter();
    @Output() symTriggers = new EventEmitter();
    @Output() table_loader = new EventEmitter();
    @Output() refreshData = new EventEmitter();
    @Input() buttonDisabledClass: string;
    @Input() selectedID: string;
    @Input() rebuildOrDrop: string;
    disableDrop: boolean;
    disableRe: boolean;

    /*
    for stoping default action
    whileloading
     */
    inProcess: boolean = false;


    installedTriggerForm: FormGroup;

    constructor(private fb: FormBuilder,
                private installedTriggerService: InstalledTriggerService,
                private alertService: AlertMessageService,
                private role: ServerNameService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.checkPermission();
    }

    checkPermission(): void {
        let role = this.role.getRole();
        switch (role) {
            case API.read:
                this.disableDrop = true;
                this.disableRe = true;
                break;
            case API.write:
                this.disableDrop = true;
                this.disableRe = false;
                break;
        }
    }

    @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
        if (this.inProcess) {
            event.preventDefault();
            event.returnValue = false;
        }

    }

    createForm(): void {
        this.installedTriggerForm = this.fb.group({
            show_sym_triggers: [false]
        });
    }

    searchValue($event) {
        this.searchBoxData.emit($event);
    }

    showSymTriggers($event) {
        if ($event.target.checked) {
            this.buttonDisabledClass = Constant.UNCLICKABLE;
        } else {
            this.buttonDisabledClass = Constant.CLICKABLE;
        }
        this.symTriggers.emit($event.target.checked);
    }

    refresh() {
        this.refreshData.emit(true);
    }

    performAction(id, btnName): void {
        let task = "";
        switch (btnName) {
            case 1:
                task = Constant.REBUILDALL;
                break;
            case 2:
                task = Constant.REBUILD;
                break;
            case 3:
                task = Constant.DROP;
                break;

        }
        this.action(id, task);
    }

    action(id, task): void {
        id = id.toString().split(',');
        if (id.length > 1) {
            let i;
            for (i = 0; i < id.length; i++) {
                this.actionComplete(id[i], task);
                // alert(id[i]);
            }
        } else {
            this.actionComplete(id[0], task);
        }
    }

    actionComplete(id, task): void {
        this.inProcess = true;
        this.table_loader.emit(true);
        this.installedTriggerService.action(id, task).subscribe(
            data => {
                if (data['responceCode'] === 0) {
                    this.success(task + " performed " + Constant.BTN_TASK_SUCCESS);
                } else {
                    this.failure(data['result']);
                }
                this.table_loader.emit(false);
                this.inProcess = false;
                this.refresh();

            }, error => {
                this.failure(error['error']['result']);
            }
        );
    }

    failure(message): void {
        this.alertService.show({
            message: message,
            alertType: "danger"
        });
    }

    success(message): void {
        this.alertService.show({
            message: message,
            alertType: "success"
        });
    }
}
