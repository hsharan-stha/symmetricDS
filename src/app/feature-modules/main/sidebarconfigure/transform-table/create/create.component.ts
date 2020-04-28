import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {TransformTableService} from "@sidebarconfigure/transform-table/service/transform-table.service";
import {Constant} from "@sidebarconfigure/transform-table/data/constant-value.enum";
import {Messages} from "@sidebarconfigure/transform-table/data/message.enum";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {GroupLinksService} from "@sidebarconfigure/group-links/services/group-links.service";
import {NodeGroupIdService} from "@sidebarconfigure/routers/services/node-group-id.service";
import {
    columnPolicy,
    deleteAction,
    transferPoint,
    updateAction
} from "@sidebarconfigure/transform-table/data/data.dropdown";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    showDialog = true;
    transformTableForm: FormGroup;
    isSubmitted: boolean = false;
    @Input() transformTableData;
    loader: boolean = false;
    selectLoader: boolean = false;
    editloader: boolean = false;
    button_name: string = Constant.SAVE;
    path: string;
    extract;
    disabledTextBox: boolean;
    sourceGroupIds;
    targetGroupId;
    transformPoint;
    updateAction;
    deleteAction;
    columnPolicy;


    constructor(private router: Router,
                private fb: FormBuilder,
                private transformTableService: TransformTableService,
                private alertService: AlertMessageService,
                private groupLinkService: GroupLinksService,
                private nodeGroupIdService: NodeGroupIdService
    ) {
    }

    ngOnInit() {
        this.urlExtract();
        this.createForm();
        this.getSourceGroupId();
        this.sourceGroupIdChange();
        this.getTransformPoint();
        this.getUpdateAction();
        this.getDeleteAction();
        this.getColumnPolicy();
        this.checkEditOrCreate();
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
            this.transformTableService.getByID(id).subscribe(
                (data) => {
                    this.transformTableForm.setValue({
                            transform_id: data.transform_id,
                            source_node_group_id: data.source_node_group_id,
                            target_node_group_id: data.target_node_group_id,
                            transform_point: data.transform_point,
                            source_catalog_name: data.source_catalog_name,
                            source_schema_name: data.source_schema_name,
                            source_table_name: data.source_table_name,
                            target_catalog_name: data.target_catalog_name,
                            target_schema_name: data.target_schema_name,
                            target_table_name: data.target_table_name,
                            update_first: data.update_first,
                            update_action: data.update_action,
                            delete_action: data.delete_action,
                            transform_order: data.transform_order,
                            column_policy: data.column_policy,
                            description: data.description
                        }
                    );
                    this.editloader = false;
                    this.disabledTextBox = true;
                }
            );
        }
    }

    createForm() {
        this.transformTableForm = this.fb.group({
            transform_id: ["",
                [Validators.required,
                    Validators.maxLength(128),
                    Validators.pattern('[A-Z_a-z0-9-]{3,50}')
                ]],
            source_node_group_id: ["", Validators.required],
            target_node_group_id: ["", Validators.required],
            transform_point: ["",[Validators.required]],
            source_catalog_name: ["", [Validators.pattern('[A-Z_a-z0-9-]{3,255}')]],
            source_schema_name: ["", [Validators.pattern('[A-Z_a-z0-9-]{3,255}')]],
            source_table_name: ["", [Validators.required, Validators.pattern('[A-Z_a-z0-9-]{3,255}')]],
            target_catalog_name: ["", [ Validators.pattern('[A-Z_a-z0-9-]{3,255}')]],
            target_schema_name: ["", [ Validators.pattern('[A-Z_a-z0-9-]{3,255}')]],
            target_table_name: ["", [ Validators.pattern('[A-Z_a-z0-9-]{3,255}')]],
            update_first: [0],
            update_action: ["", Validators.required],
            delete_action: ["UPDATE_COL",Validators.required],
            transform_order: ["", [Validators.required, Validators.pattern('[0-9]{1,11}')]],
            column_policy: ["SPECIFIED",Validators.required],
            description: [""],
        });
    }

    get field() {
        return this.transformTableForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.transformTableForm.valid) {
            this.loader = true;
            this.transformTableData = this.transformTableForm.value;
            if (this.button_name === Constant.UPDATE) {
                this.transformTableService.update(this.transformTableData)
                    .subscribe(
                        (data) => {
                            console.log(data);
                            if (data['responceCode'] === 0) {
                                this.success(Messages.UPDATE_SUCCESS);
                            }
                        }, (data) => {
                            this.failure(data['error']['result']);
                        }
                    );
            } else {
                this.transformTableService.add(this.transformTableData)
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
        this.transformTableService.setMessage(Constant.UNCLICKABLE);
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.router.navigateByUrl(this.path);
    }

    getSourceGroupId(): void {
        this.nodeGroupIdService.dataSource.subscribe(
            (data) => {
                this.sourceGroupIds = data;
            }
        );
    }

    sourceGroupIdChange() {
        this.field.target_node_group_id.setValue("");
        this.field.source_node_group_id.valueChanges.pipe(
            tap(_ => this.selectLoader = true),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((value) => this.groupLinkService.getTargetGroupId(value))
        ).subscribe(
            (data) => {
                if (data['result']) {
                    this.targetGroupId = data['result'];
                    this.selectLoader = false;
                }
            }
        );
    }

    getTransformPoint(): void {
        this.transformPoint = transferPoint;
    }

    getUpdateAction(): void {
        this.updateAction = updateAction;
    }

    getDeleteAction(): void {
        this.deleteAction = deleteAction;
    }

    getColumnPolicy(): void {
        this.columnPolicy = columnPolicy;
    }
}
