import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Constant} from "@sidebarmanage/nodes/data/constant-value.enum";
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {NodesService} from "@sidebarmanage/nodes/services/nodes.service";
import {API} from "@config/url";
import {ServerNameService} from "@shared/services/server-name.service";

@Component({
    selector: 'app-node-button-bar',
    templateUrl: './node-button-bar.component.html',
    styleUrls: ['./node-button-bar.component.css']
})
export class NodeButtonBarComponent implements OnInit {

    @Output() searchBoxData = new EventEmitter();

    @Input() buttonDisabledClass: string;
    @Input() selectedID: string;
    @Input() controlData;
    @Input() registrationData;
    // @Input() status;
    path: string = Constant.PATH + "/data-load";
    disableLDCR: boolean;


    constructor(private router: Router,
                private alertService: AlertMessageService,
                private role: ServerNameService,
                private nodeService: NodesService) {
    }

    ngOnInit() {
        this.checkPermission();
    }

    checkPermission(): void {
        let role = this.role.getRole();
        switch (true) {
            case role === API.read:
                this.disableLDCR = true;
                break;
        }
    }

    toggleVisible() {
        this.router.navigateByUrl(this.path);
    }


    searchValue($event) {
        this.searchBoxData.emit($event);
    }

    performAction(id, btnName): void {
        let task = "";
        switch (btnName) {
            case 1:
                task = "start";
                break;
            case 2:
                task = "stop";
                break;
            case 3:
                task = "uninstall";
                break;
            case 4:
                task = "allow";
                break;
            case 5:
                task = "reject";
                break;
            case 6:
                task = "reopen";
                break;
            case 7:
                task = "unregister";
                break;

        }
        this.action(id, task);
    }

    action(id, task): void {
        this.nodeService.action(id, task).subscribe(
            data => {
                if (data['responceCode'] === 0) {
                    this.success(task + " " + Constant.BTN_TASK_SUCCESS);
                } else {
                    this.failure(data['result']);
                }
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
