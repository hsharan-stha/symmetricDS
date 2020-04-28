import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GroupService} from "../service/group.service";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {Messages} from "../data/message.enum";
import {Constant} from "../data/constant-value.enum";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    showDialog = true;
    groupForm: FormGroup;
    @Input() groupData;
    submitted: boolean = false;
    loader: boolean = false;
    editloader: boolean = false;
    button_name: string = Constant.SAVE;
    path: string;
    disabledTextBox: boolean;
    extract;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private alertService: AlertMessageService,
        private groupService: GroupService) {
    }

    ngOnInit() {
        this.urlExtract();
        this.checkEditOrCreate();
        this.createForm();
    }

    urlExtract(): void {
        this.extract = this.router.url.split("/");
        this.path = this.extract[1] + '/' + this.extract[2] + '/' + this.extract[3];
    }

    checkEditOrCreate(): void {
        if ("edit" == this.extract[this.extract.length - 1]) {
            this.disabledTextBox = true;
            this.editloader = true;
            this.button_name = "Update";
            let id = this.extract[this.extract.length - 2];
            this.groupService.getByID(id).subscribe(
                (data) => {
                    this.groupForm.setValue({
                            node_group_id: data.id,
                            description: data.description
                        }
                    );
                    this.editloader = false;
                }
            );
        }
    }

    createForm(): void {
        this.groupForm = this.fb.group({
            node_group_id: ["",
                [Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern('^[A-Za-z0-9_]*$')
                ]
            ],
            description: [""]
        });
    }

    get field() {
        return this.groupForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.groupForm.valid) {
            this.loader = true;
            this.groupData = this.groupForm.value;
            let params = {
                last_update_time: null,
                last_update_by: null,
                create_time: null
            };
            this.groupData = Object.assign(this.groupData, params);
            if (this.button_name === Constant.UPDATE) {
                this.groupService.update(this.groupData).subscribe(
                    (data) => {
                        if (data['responceCode'] === 0) {
                            this.success(Messages.UPDATE_SUCCESS);
                        }
                    }, (data) => {
                        this.failure(data['error']['result']);
                    }
                );
            } else {
                this.groupService.add(this.groupData)
                    .subscribe(
                        (data) => {
                            if (data['responceCode'] === 0) {
                                this.success(Messages.STORE_SUCCESS);
                            }
                        }, (data) => {
                            this.failure(data['error']['result']);
                        }
                    );
            }


        }
    }

    failure(message): void {
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "danger"
        });
    }

    success(message): void {
        // this.groupService.setMessage(true);
        this.groupService.setMessage(Constant.UNCLICKABLE);

        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

}
