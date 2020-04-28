import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// import { Title }     from '@angular/platform-browser';

import {Button} from './../data/button';
import {Messages} from './../data/message.enum';

import {ParametersService} from './../services/parameters.service';
import {AlertMessageService} from '@shared/services/alert-message.service';
import {NodeGroupIdService} from './../services/node-group-id.service';

import {NodeGroupId} from './../model/node-group-id.model';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

    /**
     * Parameter form group
     *
     * @type FormGroup
     */
    parametersForm: FormGroup;

    /**
     * Button Value
     *
     * @type string
     */
    action: string;

    /**
     * Seleted id to be edited.
     *
     * @type string
     */
    selectedId: string;


    showCreateForm: boolean;

    /**
     * Determine whether form have been submitted or not
     *
     * @type boolean
     */
    isSubmitted: boolean;

    /**
     * Determine whether the form is valid or not
     *
     * @type boolean
     */
    isFormValid: boolean;

    /**
     * Loader button
     *
     * @type {boolean}
     */
    loader: boolean = false;
    editloader: boolean = false;

    nodeGroupIds;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private service: ParametersService,
        private alertMessage: AlertMessageService,
        private nodeGroupIdService: NodeGroupIdService
    ) {
    }

    ngOnInit() {
        this.showCreateForm = true;
        this.action = Button.UPDATE;
        this.createForm();

        this.extractId(this.router.url);

        this.service.getById(this.selectedId).subscribe(
            (data) => {
                let result = data['result'];
                this.parametersForm.setValue({
                    external_id: result.external_id,
                    node_group_id: result.node_group_id,
                    param_key: result.param_key,
                    param_value: result.param_value,
                });
                this.editloader = false;
            }
        );


        this.nodeGroupIdService.action.subscribe(
            (data) => {

                this.nodeGroupIds = data;
            }
        )

    }

    ngAfterViewInit() {

    }

    extractId(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "edit") {
            this.selectedId = explode[explode.length - 2];
            this.editloader = true;
        }
    }

    /**
     * Create a parameter form
     *
     * @return void
     */
    createForm(): void {
        this.parametersForm = this.fb.group({
            external_id: [{value: "", disabled: true}, [Validators.required]],
            node_group_id: [{value: "", disabled: true}, [Validators.required]],
            param_key: [{value: "", disabled: true}, [Validators.required]],
            param_value: ["", [Validators.required]],
        });
    }

    get field() {
        return this.parametersForm.controls;
    }


    onSubmit() {
        this.isSubmitted = true;
        this.loader = true;
        this.isFormValid = this.parametersForm.valid;

        if (this.isFormValid) {
            //
            this.service.update(this.parametersForm.getRawValue()).subscribe(
                (data) => {
                    if (data['responceCode'] === 0) {
                        this.updateSuccess();
                    }
                },
                (error) => this.showError(error.error)
            )
            ;

        }
    }


    /**
     * Display a update success message
     *
     * @return void
     */
    private updateSuccess(): void {
        this.alertMessage.show({
            message: Messages.UPDATE_SUCCESS,
            alertType: 'success'
        });
        this.afterSuccess(Button.UPDATE);

    }

    private navigate(): void {
        this.router.navigate(["/main/configure/parameters"]);
    }

    /**
     * Show Error message
     *
     * @param message string
     * @return void
     */
    private showError(error) {
        if (error.responceCode < 0) {
            this.alertMessage.show({
                message: error.result,
                alertType: 'danger'
            });
            this.loader = false;
        }
    }

    /**
     * Call this method after action has been successfull
     *
     * @param action
     * @return void
     */
    private afterSuccess(action: string): void {
        this.service.changeMessag(action);
        this.showCreateForm = false;
        this.loader = false;
        this.navigate();

    }

    /**
     * Close a edit or create dialog box
     *
     * @return void
     */
    onCancel() {
        this.service.changeMessag("cancel");
        this.navigate();
    }

}
