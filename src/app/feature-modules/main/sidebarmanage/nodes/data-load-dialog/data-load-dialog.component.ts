import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Constant} from "@sidebarmanage/nodes/data/constant-value.enum";
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {Messages} from "@sidebarmanage/nodes/data/message.enum";
import {StepTwoNotifyService} from "@sidebarmanage/nodes/services/step-two-notify.service";
import {TableReloadRequestService} from "@sidebarmanage/nodes/services/table-reload-request.service";

@Component({
    selector: 'app-data-load-dialog',
    templateUrl: './data-load-dialog.component.html',
    styleUrls: ['./data-load-dialog.component.css']
})
export class DataLoadDialogComponent implements OnInit {
    nodesTemplate: FormGroup;
    nodesTemplateData;
    nextText = Constant.NEXT_BUTTON;
    unClickable = Constant.UNCLICKABLE;
    stepVisible1 = true;
    stepVisible2 = false;
    stepVisible3 = false;
    stepVisible2of2 = false;
    path: string = Constant.PATH;
    channelDropDownToggle: any;
    displayStepTwoBottomTextBox: any;
    selectedChannelID: string;
    loader: boolean;
    inProcess: boolean;

    constructor(private router: Router,
                private alertService: AlertMessageService,
                private stepTwoNotifyService: StepTwoNotifyService,
                private tableReloadRequest: TableReloadRequestService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm(): void {
        this.nodesTemplate = this.fb.group({
            target_node_id: [""],
            source_node_id: [""],
            trigger_id: [""],
            router_id: [""],
            create_table: [""],
            delete_first: [""],
            reload_select: [""],
            before_custom_sql: [""],
            channel_id: [""],
        })
    }

    close() {
        this.router.navigateByUrl(this.path);
    }

    next() {
        this.nodesTemplateData = this.nodesTemplate.value;
        if (this.stepVisible1 === true) {
            this.stepOne();
        } else if (this.stepVisible2 === true) {
            this.stepTwo();
        } else if (this.stepVisible2of2 === true) {
            this.stepTwoOfTwo();
        } else if (this.stepVisible3 === true) {
            this.onSubmit();
        }
    }

    prev() {
        if (this.stepVisible2 === true) {
            this.afterStepThreeComplete();

        } else if (this.stepVisible3 === true || this.stepVisible2of2 === true) {
            this.afterStepOneComplete();
        }
    }

    stepOne(): any {
        switch (true) {
            case this.nodesTemplateData.source_node_id != null && this.nodesTemplateData.target_node_id != null:
                return this.afterStepOneComplete();
            default:
                this.failure(Messages.STEP_ONE_FAIL);
                return false;
        }

    }

    stepTwo(): any {
        this.getChannelValue();
        this.getTextBoxValue();
        switch (true) {
            case this.displayStepTwoBottomTextBox === 8 && this.nodesTemplateData.before_custom_sql === null:
                this.failure(Messages.STEP_TWO_TEXT_BOX_NULL);
                break;
            case this.channelDropDownToggle >= 1 && this.channelDropDownToggle <= 3
            && this.displayStepTwoBottomTextBox >= 4 && this.displayStepTwoBottomTextBox <= 8:
                if (this.channelDropDownToggle !== 3 && this.nodesTemplateData.channel_id !== null) {
                    this.setChannelNull();
                }

                if (this.channelDropDownToggle === 3 && this.nodesTemplateData.channel_id === "") {
                    this.failure(Messages.STEP_TWO_CHANNEL_NOT_SELECT);
                } else {
                    return this.afterStepTwoComplete();

                }
                break;
            default:
                this.failure(Messages.STEP_TWO_FAIL);
                return false;

        }
    }

    stepTwoOfTwo(): any {

        switch (true) {
            case (this.nodesTemplateData.trigger_id !== "") && (this.nodesTemplateData.router_id !== ""):
                this.setChannelNull();
                // alert(JSON.stringify(this.nodesTemplateData));
                return this.afterStepTwoComplete();
            default:
                this.failure(Messages.STEP_TWO_OF_TWO_FAIL);
                return false;
        }
    }

    afterStepOneComplete(): any {
        this.stepVisible1 = false;
        this.stepVisible2 = true;
        this.stepVisible2of2 = false;
        this.stepVisible3 = false;
        this.nextText = Constant.NEXT_BUTTON;
        this.unClickable = Constant.CLICKABLE;
        return true;
    }

    afterStepTwoComplete(): any {
        this.selectedChannelID = this.nodesTemplateData.channel_id;
        this.stepVisible1 = false;
        this.stepVisible2 = false;
        if (this.channelDropDownToggle === 2 && this.stepVisible2of2 === false) {
            this.stepVisible2of2 = true;
            this.nextText = Constant.NEXT_BUTTON;
        } else {
            this.stepVisible2of2 = false;
            this.stepVisible3 = true;
            this.nextText = Constant.FINISH_BUTTON;
        }

        this.unClickable = Constant.CLICKABLE;
        return true;
    }

    afterStepThreeComplete(): any {
        this.stepVisible1 = true;
        this.stepVisible2 = false;
        this.stepVisible2of2 = false;
        this.stepVisible3 = false;
        this.nextText = Constant.NEXT_BUTTON;
        this.unClickable = Constant.UNCLICKABLE;
    }

    onSubmit(): void {
        this.loader = true;
        switch (true) {
            case this.nodesTemplateData.trigger_id !== "ALL" && this.nodesTemplateData.router_id !== "ALL":
                let triggerData = this.nodesTemplateData.trigger_id;
                let routerData = this.nodesTemplateData.router_id;
                triggerData = triggerData.toString().split(",");
                routerData = routerData.toString().split(",");
                let i: number;
                for (i = 1; i < routerData.length; i++) {
                    let params = {
                        trigger_id: triggerData[i],
                        router_id: routerData[i],
                    };
                    this.nodesTemplateData = Object.assign(this.nodesTemplateData, params);
                    this.insert(this.nodesTemplateData);

                }
                break;
            default:
                this.insert(this.nodesTemplateData);
        }
    }

    insert(templateData): void {
        this.tableReloadRequest.add(templateData)
            .subscribe(
                (data) => {
                    if (data['responceCode'] === 0) {
                        this.success(Messages.TABLE_RELOAD_REQUEST_STORE_SUCCESS);
                    } else {
                        this.failure(data['result']);
                    }
                },
                (data) => {
                    this.failure(data['error']['result']);
                }
            );
    }

    success(message): void {
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

    failure(message): void {
        this.alertService.show({
            message: message,
            alertType: "danger"
        });
    }

    /* ro check whether
    input textbox is enabled
     */
    getTextBoxValue(): void {
        this.stepTwoNotifyService.getBottomNotification.subscribe(data => {
            this.displayStepTwoBottomTextBox = data;
        });
    }


    /*   to check whether
        channel dropdown
        is clicked or not
    */
    getChannelValue(): void {
        this.stepTwoNotifyService.getNotification.subscribe(data => {
            this.channelDropDownToggle = data;
        });
    }

    setChannelNull(): void {
        let params = {
            channel_id: null,
        };
        this.nodesTemplateData = Object.assign(this.nodesTemplateData, params);
    }
}
