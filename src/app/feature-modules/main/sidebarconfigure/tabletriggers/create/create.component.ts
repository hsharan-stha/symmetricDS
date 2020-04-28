import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TableTriggersService} from "../services/table-triggers.service";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {ChannelService} from "../../channels/services/channel.service";
import {Messages} from "../data/messages.enum";
import {Constant} from "@sidebarconfigure/tabletriggers/data/constant-value.enum";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    tableTriggerForm: FormGroup;
    isSubmitted: boolean = false;
    showDialog = true;
    loader: boolean = false;
    editloader: boolean = false;
    button_name: string = "Save";
    path: string;
    extract;
    @Input() tableTriggerData;
    channels_data;
    reload_channels_data;
    disabledTextBox: boolean;

    constructor(private fb: FormBuilder,
                public tableTriggerService: TableTriggersService,
                private router: Router,
                private alertService: AlertMessageService,
                private channelService: ChannelService) {
    }

    ngOnInit() {
        this.urlExtract();
        this.checkEditOrCreate();
        this.createForm();
        this.getChannelsData();
        this.getReloadChannelsData();
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
            this.tableTriggerService.getByID(id).subscribe(
                (data: any) => {
                    this.tableTriggerForm.setValue({
                            trigger_id: data.id,
                            source_catalog_name: data.source_catalog_name,
                            source_schema_name: data.source_schema_name,
                            source_table_name: data.source_table_name,
                            channel_id: data.channel_id,
                            sync_on_insert: data.sync_on_insert,
                            sync_on_update: data.sync_on_update,
                            sync_on_delete: data.sync_on_delete,
                            reload_channel_id: data.reload_channel_id,
                            sync_on_insert_condition: data.sync_on_insert_condition,
                            sync_on_update_condition: data.sync_on_update_condition,
                            sync_on_delete_condition: data.sync_on_delete_condition,
                            custom_on_insert_text: data.custom_on_insert_text,
                            custom_on_update_text: data.custom_on_update_text,
                            custom_on_delete_text: data.custom_on_delete_text,
                            sync_on_incoming_batch: data.sync_on_incoming_batch,
                            use_stream_lobs: data.use_stream_lobs,
                            use_capture_lobs: data.use_capture_lobs,
                            use_capture_old_data: data.use_capture_old_data,
                            stream_row: data.stream_row,
                            use_handle_key_updates: data.use_handle_key_updates,
                            external_select: data.external_select,
                            excluded_column_names: data.excluded_column_names,
                            included_column_names: data.included_column_names,
                            sync_key_names: data.sync_key_names,
                            channel_expression: data.channel_expression,
                        }
                    );
                    this.editloader = false;
                }
            );
        }
    }

    createForm() {
        this.tableTriggerForm = this.fb.group({
            trigger_id: ["",
                [Validators.required,
                    Validators.maxLength(128),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]],
            source_catalog_name: ["",
                [
                    Validators.maxLength(255),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]],
            source_schema_name: ["",
                [
                    Validators.maxLength(255),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]],
            source_table_name: ["",
                [Validators.required,
                    Validators.maxLength(255),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]],
            channel_id: ["default", Validators.required],
            sync_on_insert: [1],
            sync_on_update: [1],
            sync_on_delete: [1],
            reload_channel_id: ["reload", Validators.required],
            sync_on_insert_condition: ["1=1"],
            sync_on_update_condition: ["1=1"],
            sync_on_delete_condition: ["1=1"],
            custom_on_insert_text: [""],
            custom_on_update_text: [""],
            custom_on_delete_text: [""],
            sync_on_incoming_batch: [0],
            use_stream_lobs: [0],
            use_capture_lobs: [0],
            use_capture_old_data: [1],
            stream_row: [0],
            use_handle_key_updates: [1],
            external_select: [""],
            excluded_column_names: [""],
            included_column_names: [""],
            sync_key_names: [""],
            channel_expression: [""]
        });
    }

    get field() {
        return this.tableTriggerForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.tableTriggerForm.valid) {
            this.loader = true;
            this.tableTriggerData = this.tableTriggerForm.value;
            if (this.button_name == "Update") {
                this.tableTriggerService.update(this.tableTriggerData)
                    .subscribe(
                        data => {
                            if (data['responceCode'] === 0) {
                                this.success(Messages.UPDATE_SUCCESS);
                            } else {
                                this.failure(data['result']);
                            }
                        },
                        (data) => {
                            this.failure(data['error']['result']);
                        }
                    );
            } else {
                this.tableTriggerService.add(this.tableTriggerData)
                    .subscribe(
                        (data) => {
                            if (data['responceCode'] === 0) {
                                this.success(Messages.STORE_SUCCESS);
                            } else {
                                this.failure(data['result']);
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
        // this.tableTriggerService.setMessage(true);
        this.tableTriggerService.setMessage(Constant.UNCLICKABLE);

        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

    getChannelsData(): void {
        this.channelService.getChannelId.subscribe(
            data => {
                if ((typeof data) !== "string") {
                    this.channels_data = data;
                }
            }
        );
    }

    getReloadChannelsData(): void {
        this.channelService.getReloadChannelId.subscribe(
            data => {
                if ((typeof data) !== "string") {
                    this.reload_channels_data = data;
                }
            }
        );
    }

}
