import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
  
import {LinkService} from './../services/link.service';
import {Link} from './../model/link.model';
import {NodeGroupIdService} from './../services/node-group-id.service';
import {NodeGroupId} from './../model/node-group-id.model';
import {GroupLinksService} from './../services/group-links.service';
import {ButtonValue} from './../data/button-value.enum';
import {Messages} from './../data/message.enum';
import {AlertMessageService} from '@shared/services/alert-message.service';

@Component({
    selector: 'create-form',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    /**
     * Node Group Id list
     *
     * @type NodeGroupId array
     */
    nodeGroupIds: NodeGroupId[];

    /**
     * Link of array
     */
    links: Link[];

    /**
     * Group link form
     *
     * @type FormGroup
     */
    groupLinkForm: FormGroup;

    /**
     * Flag to determine whether the form is submitted or not
     *
     * @type {boolean}
     */
    isSubmitted: boolean = false;

    /**
     * Is form valid
     *
     * @type boolean
     */
    isFormValid: boolean = false;

    /**
     * Value of button
     *
     * @type string
     */

    buttonValue: string;


    id: string;

    showCreateForm: boolean = false;

    loader: boolean = false;

    editloader: boolean = false;


    constructor(private fb: FormBuilder,
                private linkService: LinkService,
                private nodeGroupIdService: NodeGroupIdService,
                private groupLinkService: GroupLinksService,
                private router: Router,
                private alertMessage: AlertMessageService
    ) {
    }

    ngOnInit() {
        // load a data for options
        this.getNodeGroupId();
        this.getLinks();

        this.createForm();
        this.showCreateForm = true;

        this.findWhichFormOpen(this.router.url);
        console.log("Ng On init group links create");

    }

    /**
     * Get a link list
     *
     * @return void
     */
    getLinks() {
        this.linkService.get().subscribe(
            (data) => this.links = data
        );
    }

    /**
     * Get a node group id list
     *
     * @return void
     */
    getNodeGroupId() {
        this.nodeGroupIdService.dataSource.subscribe(
            (data) => this.nodeGroupIds = data
        );
    }

    /**
     * Find if url have add segment or not
     *
     * @param url string
     * @returns {boolean}
     */
    private findWhichFormOpen(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "edit") {
            this.editloader=true;
            this.id = explode[explode.length - 2];
            this.groupLinkService.getById(this.id).subscribe(
                (data) => {

                    this.groupLinkForm.setValue({
                        source_node_group_id: data.source_node_group_id,
                        target_node_group_id: data.target_node_group_id,
                        data_event_action: data.data_event_action,
                        is_reversible: data.is_reversible,
                        sync_config_enabled: data.sync_config_enabled
                    });

                    this.groupLinkForm.get("source_node_group_id").disable();
                    this.groupLinkForm.get("target_node_group_id").disable();
                    this.editloader=false;
                }
            )
            this.buttonValue = ButtonValue.UPDATE; 
        } else if (explode[explode.length - 1] == "create") { 
            this.buttonValue = ButtonValue.SAVE;
        }
    }

    /**
     * Form to create group links
     *
     * @return void
     */
    createForm() {
        this.groupLinkForm = this.fb.group({
            source_node_group_id: ["", Validators.required],
            data_event_action: ["", Validators.required],
            target_node_group_id: ["", Validators.required],
            is_reversible: [0],
            sync_config_enabled: [1]
        });
    }

    get field() {
        return this.groupLinkForm.controls;
    }

    /**
     * Store a group link details
     *
     * @return void
     */
    store(): void {
        this.groupLinkService.store(this.groupLinkForm.value).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.storeSuccess();
                }
            },
            (error) => this.showError(error.error)
        );
    }

    /**
     * Update a group link details
     *
     * @return void
     */
    update(): void {
        this.groupLinkService.update(this.groupLinkForm.getRawValue()).subscribe(
            (data) => {
                if (data['responceCode'] === 0) {
                    this.updateSuccess();
                }
            },
            (error) => this.showError(error.error)
        );
    }

    /**
     * Submit a form details
     *
     * @return void
     */
    onSubmit() {
        this.isSubmitted = true;
        this.isFormValid = this.groupLinkForm.valid;

        if (this.isFormValid) {
            this.loader = true;
            if (this.buttonValue == ButtonValue.SAVE) {
                this.store();
            } else {
                this.update();
            }
        }
    }

    /**
     * Display store success message
     *
     * @return void
     */
    storeSuccess(): void {
        this.alertMessage.show({
            message: Messages.STORE_SUCCESS,
            alertType: 'success'
        });
        this.afterSuccess(ButtonValue.SAVE);

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
        this.afterSuccess(ButtonValue.UPDATE);

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
     * Call this method after action has been successfull
     *
     * @param action
     * @return void
     */
    afterSuccess(action: string): void {
        this.groupLinkService.changeMessag(action);
        this.showCreateForm = false;
        this.loader = false;
        this.router.navigate(["/main/configure/group-links"]);
    }

    /**
     * Close a edit or create dialog box
     *
     * @return void
     */
    onCancel() {
        this.groupLinkService.changeMessag("cancel");
        this.router.navigate(["/main/configure/group-links"]);
    }
}
