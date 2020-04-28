import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ChannelService} from "../services/channel.service";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {Messages} from "../data/messages.enum";
import {batchAlgorithm, dataLoaderType, groupLinkDirection} from "../data/data.dropdown";
import {Constant} from "../data/constant-value.enum";


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    showDialog = true;
    channelForm: FormGroup;
    isSubmitted: boolean = false;
    @Input() channelData;
    batchAlgorithm;
    dataLoaderType;
    groupLinkDirection;
    loader: boolean = false;
    editloader: boolean = false;
    button_name: string = Constant.SAVE;
    path: string;
    extract;
    disabledTextBox: boolean;

    constructor(private router: Router,
                private fb: FormBuilder,
                private channelService: ChannelService,
                private alertService: AlertMessageService) {
    }

    ngOnInit() {
        this.urlExtract();
        this.getBatchAlgorithm();
        this.getDataLoaderType();
        this.getGroupLinkDirection();
        this.checkEditOrCreate();
        this.createForm();
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
            this.channelService.getByID(id).subscribe(
                (data) => {
                    this.channelForm.setValue({
                            channel_id: data.id,
                            processing_order: data.processing_order,
                            batch_algorithm: data.batch_algorithm,
                            max_batch_size: data.max_batch_size,
                            max_batch_to_send: data.max_batch_to_send,
                            max_data_to_route: data.max_data_to_route,
                            max_network_kbps: data.max_network_kbps,
                            data_loader_type: data.data_loader_type,
                            queue: data.queue,
                            data_event_action: data.data_event_action,
                            description: data.description,
                            enabled: data.enabled,
                            reload_flag: data.reload_flag,
                            file_sync_flag: data.file_sync_flag,
                            use_old_data_to_route: data.use_old_data_to_route,
                            use_row_data_to_route: data.use_row_data_to_route,
                            use_pk_data_to_route: data.use_pk_data_to_route,
                            contains_big_lob: data.contains_big_lob,
                        }
                    );
                    this.editloader = false;
                }
            );
        }
    }

    createForm() {
        this.channelForm = this.fb.group({
            channel_id: ["",
                [Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]],
            processing_order: [50,
                [Validators.required,
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ]],
            batch_algorithm: ["default", Validators.required],
            max_batch_size: [10000,
                [Validators.required,
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ]],
            max_batch_to_send: [10,
                [Validators.required,
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ]],
            max_data_to_route: [10000,
                [Validators.required,
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]*$')
                ]],
            max_network_kbps: [0,
                [Validators.required,
                    Validators.maxLength(11),
                    Validators.pattern('^[0-9]+(.[0-9]{0,3})?$')
                ]],
            data_loader_type: ["default", Validators.required],
            queue: ["",
                [Validators.required,
                    Validators.maxLength(25),
                    Validators.pattern('^[A-Za-z0-9]*$')
                ]],
            data_event_action: [""],
            description: [""],
            enabled: [1],
            reload_flag: [0],
            file_sync_flag: [0],
            use_old_data_to_route: [1],
            use_row_data_to_route: [0],
            use_pk_data_to_route: [1],
            contains_big_lob: [0],
        })
    }

    getBatchAlgorithm(): void {
        this.batchAlgorithm = batchAlgorithm;
    }


    getDataLoaderType(): void {
        this.dataLoaderType = dataLoaderType;
    }


    getGroupLinkDirection(): void {
        this.groupLinkDirection = groupLinkDirection;
    }

    get field() {
        return this.channelForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.channelForm.valid) {
            this.loader = true;
            this.channelData = this.channelForm.value;
            if (this.button_name === Constant.UPDATE) {
                this.channelService.update(this.channelData)
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
                this.channelService.add(this.channelData)
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
        // this.channelService.setMessage(true);
        this.channelService.setMessage(Constant.UNCLICKABLE);

        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

}


