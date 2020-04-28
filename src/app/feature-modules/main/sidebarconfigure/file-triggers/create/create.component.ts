import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {FileTriggersService} from "../services/file-triggers.service";
import {Constant} from "../data/constant-value.enum";
import {Messages} from "../data/messages.enum";
import {ChannelService} from "../../channels/services/channel.service";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    showDialog = true;
    fileTriggerForm: FormGroup;
    isSubmitted: boolean = false;
    @Input() fileTriggerData;
    loader: boolean = false;
    editloader: boolean = false;
    button_name: string = Constant.SAVE;
    path: string;
    extract;
    disabledTextBox: boolean;
    reload_channels_data;
    channels_data;


    constructor(private router: Router,
                private fb: FormBuilder,
                private fileTriggersService: FileTriggersService,
                private channelService: ChannelService,
                private alertService: AlertMessageService
    ) {
    }

    ngOnInit() {
        this.urlExtract();
        this.checkEditOrCreate();
        this.getChannelsData();
        this.getReloadChannelsData();
        this.createForm();
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
            this.fileTriggersService.getByID(id).subscribe(
                (data) => {
                    this.fileTriggerForm.setValue({
                            trigger_id: data.id,
                            channel_id: data.channel_id,
                            reload_channel_id: data.reload_channel_id,
                            base_dir: data.base_dir,
                            recurse: data.recurse,
                            includes_files: data.includes_files,
                            excludes_files: data.excludes_files,
                            sync_on_create: data.sync_on_create,
                            sync_on_modified: data.sync_on_modified,
                            sync_on_delete: data.sync_on_delete,
                            sync_on_ctl_file: data.sync_on_ctl_file,
                            delete_after_sync: data.delete_after_sync,
                            before_copy_script: data.before_copy_script,
                            after_copy_script: data.after_copy_script
                        }
                    );
                    this.editloader = false;
                    this.disabledTextBox = true;

                }
            );
        }
    }

    createForm() {
        this.fileTriggerForm = this.fb.group({
            trigger_id: ["",
                [Validators.required,
                    Validators.maxLength(128),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]],
            channel_id: ["filesync", Validators.required],
            reload_channel_id: ["filesync_reload", Validators.required],
            base_dir: [""],
            recurse: [0],
            includes_files: [""],
            excludes_files: [""],
            sync_on_create: [1],
            sync_on_modified: [1],
            sync_on_delete: [1],
            sync_on_ctl_file: [0],
            delete_after_sync: [0],
            before_copy_script: [""],
            after_copy_script: [""]
        });
    }

    get field() {
        return this.fileTriggerForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.fileTriggerForm.valid) {
            this.loader = true;
            this.fileTriggerData = this.fileTriggerForm.value;
            if (this.button_name === Constant.UPDATE) {
                this.fileTriggersService.update(this.fileTriggerData)
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
                this.fileTriggersService.add(this.fileTriggerData)
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
        // this.fileTriggersService.setMessage(true);
        this.fileTriggersService.setMessage(Constant.UNCLICKABLE);
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
