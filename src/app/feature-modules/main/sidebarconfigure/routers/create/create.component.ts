import {Component, OnInit, Output, EventEmitter, AfterViewChecked} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {RoutersService} from './../services/routers.service';

import {RouterTypeService} from './../services/router-type.service';
import {RouterType} from './../model/router-type.model';

import {Button} from './../data/button.enum';
import {AlertMessageService} from '@shared/services/alert-message.service';
import {Messages} from './../data/message.enum';

import {NodeGroupIdService} from './../services/node-group-id.service';
import {debounceTime, distinctUntilChanged, mergeMap, switchMap, filter} from 'rxjs/operators';

import {GroupLinksService} from './../../group-links/services/group-links.service';


@Component({
    selector: 'create-form',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewChecked {

    routersForm: FormGroup;

    /**
     * Determine whether to show form or not
     *
     * @type {boolean}
     */
    showCreateForm: boolean;

    /**
     * Flag to determine whether the form is submitted or not
     *
     * @type {boolean}
     */
    isSubmitted: boolean = false;

    /**
     * Flat to determine whether the form is valid or not
     *
     * @type { boolean}
     */
    isFormValid: boolean = false;

    /**
     * Router type list array
     *
     */
    routerType: RouterType[];

    sourceGroupIds;

    id: string;

    buttonValue: string;

    loader: boolean = false;
    editloader: boolean = false;

    targetGroupId;

    @Output() cancelClick: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: RoutersService,
        private routerTypeService: RouterTypeService,
        private alertMessage: AlertMessageService,
        private groupLinkService: GroupLinksService,
        private nodeGroupIdService: NodeGroupIdService
    ) {
    }

    ngOnInit() {

        this.createForm();
        this.getRouterType();

        this.showCreateForm = true;

        this.findWhichFormOpen(this.router.url);
        this.sourceGroupIdChange();

        this.nodeGroupIdService.dataSource.subscribe(
            (data) => {
                this.sourceGroupIds = data;
            }
        );

    }

    ngAfterViewChecked(): void {

    }

    getRouterType() {
        this.routerTypeService.get().subscribe(
            (data) => {
                this.routerType = data;
            }
        );
    }

    private findWhichFormOpen(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "edit") {
            this.editloader = true;
            this.id = explode[explode.length - 2];
            this.service.getById(this.id).subscribe(
                (data) => {

                    this.routersForm.setValue({
                        router_id: data.router_id,
                        source_node_group_id: data.source_node_group_id,
                        target_node_group_id: data.target_node_group_id,
                        router_type: data.router_type,
                        router_expression: data.router_expression,
                        source_catalog: data.use_source_catalog_schema,
                        target_catalog: (data.target_catalog_name) ? data.target_catalog_name : "",
                        target_schema: (data.target_schema_name) ? data.target_schema_name : "",
                        target_table: data.target_table_name,
                        sync_on_update: data.sync_on_update,
                        sync_on_insert: data.sync_on_insert,
                        sync_on_delete: data.sync_on_delete
                    });
                    this.routersForm.get("router_id").disable();
                    this.sourceCatalogChange();
                    this.editloader = false;

                }
            )
            this.buttonValue = Button.UPDATE;

        } else if (explode[explode.length - 1] == "create") {
            this.buttonValue = Button.SAVE;
        }
    }

    /**
     * Form to create router details
     *
     * @return void
     */
    createForm() {
        this.routersForm = this.fb.group({
            router_id: ["", [Validators.required, Validators.maxLength(50), Validators.pattern('[A-Z_a-z0-9-]{3,50}')]],
            source_node_group_id: ["", [Validators.required]],
            target_node_group_id: [{value: "", disabled: true}, [Validators.required]],
            router_type: ["default", Validators.required],
            router_expression: [""],
            source_catalog: [0],
            target_catalog: [{value: "", disabled: false}, [Validators.maxLength(255), Validators.pattern('[A-z_]*')]],
            target_schema: ["", [Validators.maxLength(255), Validators.pattern('[A-z_]*')]],
            target_table: ["", [Validators.maxLength(255), Validators.pattern('[A-z_]*')]],
            sync_on_update: [1],
            sync_on_insert: [1],
            sync_on_delete: [1]
        });
    }

    sourceCatalogChange() {

        if (this.routersForm.get("source_catalog").value) {
            this.routersForm.get("target_catalog").disable();
            this.routersForm.get("target_schema").disable();
        } else {
            this.routersForm.get("target_catalog").enable();
            this.routersForm.get("target_schema").enable();
        }
    }

    get field() {
        return this.routersForm.controls;
    }

    /**
     * Navigate ot main page
     *
     * @return void
     */
    private navigateToMainPage(): void {
        this.router.navigate(["/main/configure/routers"]);
    }

    onSubmit() {
        this.isSubmitted = true;
        this.isFormValid = this.routersForm.valid;
        if (this.isFormValid) {
            this.loader = true;
            if (this.buttonValue == "Update") {
                this.update();
            } else {
                this.store();
            }

        }

    }

    store() {

        this.service.store(this.routersForm.getRawValue()).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.alertMessage.show({
                        message: Messages.STORE_SUCCESS,
                        alertType: 'success'
                    });
                    this.afterSuccess(Button.SAVE);
                }
            },
            (error) => {

                this.showError(error.error);

            }
        );
    }

    update() {
        this.service.update(this.routersForm.getRawValue()).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.updateSuccess();
                }
            }, (error) => this.showError(error.error)
        );
    }

    onCancel() {
        this.service.setMessage("cancel");
        this.navigateToMainPage();
    }

    /**
     * Show Error message
     *
     * @param message string
     * @return void
     */
    showError(error) {
        if (error.responceCode < 0) {
            this.alertMessage.show({
                message: error.result,
                alertType: 'danger'
            });
            this.loader = false;
        }
    }

    /**
     * Display a update success message
     *
     * @return void
     */
    updateSuccess(): void {
        this.alertMessage.show({
            message: Messages.UPDATE_SUCCESS,
            alertType: 'success'
        });
        this.afterSuccess(Button.UPDATE);
    }

    /**
     * Call this method after action has been successfull
     *
     * @param action
     * @return void
     */
    afterSuccess(action: string): void {
        this.service.setMessage(action);
        this.showCreateForm = false;
        this.loader = false;
        this.router.navigate(["/main/configure/routers"]);
    }

    sourceGroupIdChange() {

        this.field.source_node_group_id.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            filter((data) => {
                if (data == "")
                    return;
                return data;
            }),
            switchMap((value) => this.groupLinkService.getTargetGroupId(value))
        ).subscribe(
            (data) => {
                if (data['result']) {
                    this.targetGroupId = data['result'];
                    this.field.target_node_group_id.enable();
                }
            }
        );

    }

}
