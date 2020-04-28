import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {Constant} from "../data/constant-value.enum";
import {FileRoutingService} from "../services/file-routing.service";
import {Messages} from "../data/messages.enum";
import {FileTriggersService} from "../../file-triggers/services/file-triggers.service";
import {RoutersService} from "../../routers/services/routers.service";
import {conflictStrategy} from "../data/data.dropdown";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    showDialog = true;
    fileRoutingForm: FormGroup;
    isSubmitted: boolean = false;
    @Input() fileRoutingData;
    loader: boolean = false;
    editloader: boolean = false;
    button_name: string = Constant.SAVE;
    path: string;
    extract;
    disabledTextBox: boolean;
    file_triggers;
    router_data;
    conflict_strategy_data;

    constructor(private router: Router,
                private fb: FormBuilder,
                private fileRoutingService: FileRoutingService,
                private fileTriggerService: FileTriggersService,
                private routerService: RoutersService,
                private alertService: AlertMessageService) {
    }

    ngOnInit() {
        this.urlExtract();
        this.checkEditOrCreate();
        this.createForm();
        this.getFileTriggerData();
        this.getRouterData();
        this.getConflictStrategy();
    }

    urlExtract(): void {
        this.extract = this.router.url.split("/");
        this.path = this.extract[1] + '/' + this.extract[2] + '/' + this.extract[3];
    }

    checkEditOrCreate(): void {
        if ("edit" == this.extract[this.extract.length - 1]) {
            this.editloader = true;
            this.button_name = Constant.UPDATE;
            let id = this.extract[this.extract.length - 2];
            this.fileRoutingService.getByID(id).subscribe(
                (data) => {
                    this.fileRoutingForm.setValue({
                            trigger_id: data.trigger_id,
                            router_id: data.router_id,
                            enabled: data.enabled,
                            initial_load_enabled: data.initial_load_enabled,
                            target_base_dir: data.target_base_dir,
                            conflict_strategy: data.conflict_strategy,
                        }
                    );
                    this.editloader = false;
                    this.disabledTextBox = true;
                }
            );
        }
    }

    createForm() {
        this.fileRoutingForm = this.fb.group({
            trigger_id: ["", Validators.required],
            router_id: ["", Validators.required],
            enabled: [0],
            initial_load_enabled: [1],
            target_base_dir: [""],
            conflict_strategy: ["", Validators.required]
        });
    }

    get field() {
        return this.fileRoutingForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.fileRoutingForm.valid) {
            this.loader = true;
            this.fileRoutingData = this.fileRoutingForm.value;
            if (this.button_name === Constant.UPDATE) {
                this.fileRoutingService.update(this.fileRoutingData)
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
                this.fileRoutingService.add(this.fileRoutingData)
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
        // this.fileRoutingService.setMessage(true);
        this.fileRoutingService.setMessage(Constant.UNCLICKABLE);
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

    getFileTriggerData(): void {
        this.fileTriggerService.getFileTriggerId.subscribe(
            data => {
                if ((typeof data) !== "string") {
                    this.file_triggers = data;
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

    getConflictStrategy(): void {
        this.conflict_strategy_data = conflictStrategy;
    }
}
