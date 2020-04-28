import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {TableRoutingService} from "../services/table-routing.service";
import {TableTriggersService} from "../../tabletriggers/services/table-triggers.service";
import {RoutersService} from "../../routers/services/routers.service";
import {Messages} from "../data/messages.enum";
import {Constant} from "@sidebarconfigure/tablerouting/data/constant-value.enum";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    showDialog = true;
    tableRoutingForm: FormGroup;
    isSubmitted: boolean = false;
    @Input() tableRoutingData;
    loader: boolean = false;
    editloader: boolean = false;
    button_name: string = "Save";
    path: string;
    extract;
    disabledTextBox: boolean;
    trigger_data;
    router_data;

    constructor(private router: Router,
                private fb: FormBuilder,
                private tableRoutingService: TableRoutingService,
                private tableTriggerService: TableTriggersService,
                private routerService: RoutersService,
                private alertService: AlertMessageService) {
    }

    ngOnInit() {
        this.urlExtract();
        this.checkEditOrCreate();
        this.createForm();
        this.getTriggerData();
        this.getRouterData();

    }

    urlExtract(): void {
        this.extract = this.router.url.split("/");
        this.path = this.extract[1] + '/' + this.extract[2] + '/' + this.extract[3];
    }

    checkEditOrCreate(): void {
        if ("edit" == this.extract[this.extract.length - 1]) {
            this.editloader = true;
            this.disabledTextBox = true;
            this.button_name = "Update";
            let id = this.extract[this.extract.length - 2];
            this.tableRoutingService.getByID(id).subscribe(
                (data) => {
                    this.tableRoutingForm.setValue({
                            trigger_id: data.trigger_id,
                            router_id: data.router_id,
                            initial_load_select: data.initial_load_select,
                            initial_load_delete_stmt: data.initial_load_delete_stmt,
                            initial_load_order: data.initial_load_order,
                            enabled: data.enabled,
                            ping_back_enabled: data.ping_back_enabled
                        }
                    );
                    this.editloader = false;
                }
            );
        }
    }

    createForm() {
        this.tableRoutingForm = this.fb.group({
            trigger_id: ["", Validators.required],
            router_id: ["", Validators.required],
            initial_load_select: [""],
            initial_load_delete_stmt: [""],
            initial_load_order: [50, [Validators.required,
                Validators.maxLength(11),
                Validators.pattern('^[0-9]*$')]],
            enabled: [1],
            ping_back_enabled: [0]
        });
    }

    get field() {
        return this.tableRoutingForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.tableRoutingForm.valid) {
            this.loader = true;
            this.tableRoutingData = this.tableRoutingForm.value;
            if (this.button_name == "Update") {
                this.tableRoutingService.update(this.tableRoutingData)
                    .subscribe(
                        (data) => {
                            if (data['responceCode'] === 0) {
                                this.success(Messages.UPDATE_SUCCESS);
                            }
                        }, (data) => {
                            this.failure(data['error']['result']);
                        }
                    );
            } else {
                this.tableRoutingService.add(this.tableRoutingData)
                    .subscribe(
                        (data) => {
                            if (data['responceCode'] === 0) {
                                this.success(Messages.STORE_SUCCESS);
                            }
                        },
                        (data) => {
                            this.failure(data['error']['result']);
                        }
                    );
            }


        }
    }

    onCancel() {
        this.router.navigate([this.path]);
    }

    failure(message): void {
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "danger"
        });
    }

    success(message): void {
        // this.tableRoutingService.setMessage(true);
        this.tableRoutingService.setMessage(Constant.UNCLICKABLE);
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

    getTriggerData(): void {
        this.tableTriggerService.getTriggerId.subscribe(
            data => {
                if ((typeof data) !== "string") {
                    this.trigger_data = data;
                }
            }
        );
    }

    getRouterData(): void {
        this.routerService.getRouterID.subscribe(
            data => {
                if ((typeof data) !== "string") {
                    this.router_data = data;
                }
            }
        );
    }

}
