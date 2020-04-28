import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from '@angular/router';

import {Button} from './../data/button.enum';
import {Messages} from './../data/message.enum';

import {UserService} from './../services/user.service';
import {RoleService} from './../services/role.service';
import {AlertMessageService} from '@shared/services/alert-message.service';

import {Role} from './../model/role.model'


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    /**
     * User form
     *
     * @type FormGroup
     */
    userForm: FormGroup;

    /**
     * Button value
     *
     * @type string
     */
    buttonValue: string;

    /**
     * Role list
     *
     * @type Role
     */
    roles: Role[];

    showCreateForm: boolean;

    /**
     * Determine whether the form is submmitted
     *
     * @type boolean
     */
    isSubmitted: boolean;

    id: string;

    isFormValid: boolean;

    loader: boolean = false;
    editloader: boolean = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private service: UserService,
        private roleService: RoleService,
        private alertMessage: AlertMessageService,
    ) {
    }

    ngOnInit() {

        this.createForm();
        this.buttonValue = Button.SAVE;

        this.getRoleList();

        this.showCreateForm = true;

        this.findWhichFormOpen(this.router.url);
    }


    private findWhichFormOpen(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "edit") {
            this.editloader = true;
            this.id = explode[explode.length - 2];
            this.service.getById(this.id).subscribe(
                (data) => {
                    this.userForm.setValue({
                        username: data.username,
                        //password : data.password,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role_id,

                    });
                    this.editloader = false;
                }
            );
            this.field.username.disable();
            this.buttonValue = Button.UPDATE;

        } else if (explode[explode.length - 1] == "create") {

            this.buttonValue = Button.SAVE;

            this.userForm.addControl("password", new FormControl("", Validators.required));

        }
    }

    /**
     * Get a list of role
     *
     * @return void
     */
    getRoleList() {
        this.roleService.get().subscribe(
            (data) => this.roles = data
        )
    }

    /**
     * Create a user form
     *
     * @return void
     */
    createForm() {
        this.userForm = this.fb.group({
            username: ["", [Validators.required]],
            //password : ["", [ Validators.required ]],
            role_id: ["", [Validators.required]],
            first_name: ["", [Validators.required]],
            last_name: ["", [Validators.required]]
        });
    }

    get field() {
        return this.userForm.controls;
    }

    /**
     * Navigate ot main page
     *
     * @return void
     */
    private navigateToMainPage(): void {
        this.router.navigate(["/main/configure/user"]);
    }

    onCancel() {
        this.service.setAction("cancel");
        this.navigateToMainPage();
    }


    onSubmit() {
        this.isSubmitted = true;
        this.isFormValid = this.userForm.valid;
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

        this.service.store(this.userForm.getRawValue()).subscribe(
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
        this.service.update(this.userForm.getRawValue()).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.updateSuccess();
                }
            }, (error) => this.showError(error.error)
        );
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
        this.service.setAction(action);
        this.showCreateForm = false;
        this.loader = false;
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


}
