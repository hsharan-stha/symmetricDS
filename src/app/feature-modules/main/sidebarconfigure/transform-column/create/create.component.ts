import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TransformType} from '../model/transform-type.model';
import {TransformTypeService} from '../services/transform-type.service';
import {TransformColumn} from '../model/transform-column.model';
import {TranformColumnService} from '../services/tranform-column.service';
import {AlertMessageService} from '@shared/services/alert-message.service';
import {Router} from '@angular/router';
import {debounce, switchMap, debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {TransformTableService} from '@sidebarconfigure/transform-table/service/transform-table.service';
import {isNgTemplate} from '@angular/compiler';
import {Messages} from '../data/message.enum';
import {IncludeOn} from '../data/include-on.data';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    /**
     * Transform form group
     *
     * @type FormGroup
     */
    transformFormGroup: FormGroup;


    showDialog: boolean = true;

    /**
     * Transform Type list
     *
     */
    transformTypeList: TransformType[];

    /**
     * Determine whether the action is edit or create
     *
     * @type string
     */
    action: string = "Create";

    includeOnList;

    columnNameList;

    transformTableList;

    columnNameLoading: boolean = false;

    showForm: boolean = true;

    loader: boolean = false;
    editloader: boolean = false;

    /**
     * Determine whether the form is submitted or not
     *
     * @type boolean
     */
    isSubmitted: boolean = false;

    id: string;

    constructor(
        private fb: FormBuilder,
        private transformType: TransformTypeService,
        private service: TranformColumnService,
        private alertMessage: AlertMessageService,
        private router: Router,
        private transformTable: TransformTableService,
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.getTransfromType();

        this.includeOnList = IncludeOn.get();
        console.log(this.includeOnList);

        this.field.transform_id.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => this.columnNameLoading = true),
            switchMap((data) => this.service.getColumnName(data))
        ).subscribe(
            (data) => {
                this.columnNameLoading = false;
                this.columnNameList = data['result'];

                if (this.action != "Update")
                    this.field.target_column_name.enable();

                this.field.source_column_name.enable();
            }
        )

        this.getTransformTable();

        this.findWhichFormOpen(this.router.url);
    }

    /**
     * Get a list of transform table
     *
     * @return void
     */
    getTransformTable(): void {
        this.transformTable.getByTransformId().subscribe(
            (data) => {
                console.log(data);
                this.transformTableList = data['result'];
            }
        )
    }

    get field() {
        return this.transformFormGroup.controls;
    }

    private findWhichFormOpen(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "edit") {
            this.editloader = true;
            this.action = "Update";
            this.id = explode[explode.length - 2];
            this.service.getById(this.id).subscribe(
                (data) => {


                    this.transformFormGroup.setValue({
                        "transform_id": data.transform_id,
                        "include_on": data.include_on,
                        "target_column_name": data.target_column_name,
                        "source_column_name": data.source_column_name,
                        "pk": data.pk,
                        "transform_type": data.transform_type,
                        "transform_expression": data.transform_expression,
                        "transform_order": data.transform_order,
                        "description": data.description
                    });
                    this.field.transform_id.disable();
                    this.field.include_on.disable();
                    this.editloader = false;

                }
            )
            // this.buttonValue = Button.UPDATE;

        } else if (explode[explode.length - 1] == "create") {
            // this.buttonValue = Button.SAVE;
        }
    }

    /**
     * Get a list of transform type list
     *
     * @return void
     */
    getTransfromType(): void {
        this.transformType.get().subscribe(
            (data) => {
                this.transformTypeList = data;
            }
        );
    }

    /**
     * Form to create transform column
     *
     * @return void
     */
    createForm() {
        this.transformFormGroup = this.fb.group({
            "transform_id": ["", [Validators.required]],
            "include_on": ["", [Validators.required]],
            "target_column_name": [{value: "", disabled: true}, Validators.required],
            "source_column_name": [{value: "", disabled: true}],
            "pk": [""],
            "transform_type": [""],
            "transform_expression": [""],
            "transform_order": ["", [Validators.required, Validators.pattern("[0-9]{1,11}")]],
            "description": [""]
        });
        console.log(this.transformFormGroup)
    }

    onSubmit(): void {
        this.isSubmitted = true;
        this.loader = true;
        if (this.transformFormGroup.valid) {
            if (typeof this.id != "undefined") {
                this.update()
            } else {
                this.store();
            }
        }


    }

    update() {
        this.service.update(this.transformFormGroup.getRawValue()).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.alertMessage.show({
                        message: Messages.UPDATE_SUCCESS,
                        alertType: 'success'
                    });
                    this.afterSuccess("Update");
                }
            },
            (error) => {

                this.showError(error.error);

            }
        );
    }

    store() {
        this.service.store(this.transformFormGroup.value).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.alertMessage.show({
                        message: Messages.STORE_SUCCESS,
                        alertType: 'success'
                    });
                    this.afterSuccess("Create");
                }
            },
            (error) => {

                this.showError(error.error);

            }
        );
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
            // this.loader = false;
        }
    }

    /**
     * Call this method after action has been successfull
     *
     * @param action
     * @return void
     */
    afterSuccess(action: string): void {
        this.service.changeMessag(action);
        this.showForm = false;
        this.loader = false;
        this.router.navigate(["/main/configure/transform-column"]);
    }


    /**
     * Cancel button is clicked from confirm box
     *
     * @return void
     */
    onCancel() {
        this.service.changeMessag("cancel");
        this.alertMessage.cancel();
        this.router.navigate(["/main/configure/transform-column"]);
    }
}
