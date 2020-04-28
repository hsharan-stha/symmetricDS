import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, mergeMap, switchMap, tap} from 'rxjs/operators';

import {ParametersService} from './../services/parameters.service';
import {DisplayedRouterColsList, RouterColsList, TableCols} from './../cols.table';

import {Parameters} from './../model/parameters.model';
import {NodeGroupId} from './../model/node-group-id.model';

import {NodeGroupIdService} from './../services/node-group-id.service';
import {ServerNameService} from "@shared/services/server-name.service";
import {API} from "@config/url";

@Component({
    selector: 'app-parameters',
    templateUrl: './parameters.component.html',
    styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit, AfterViewInit {

    /**
     * Value type in filter box
     *
     * @type string
     */
    subText: string;

    parameterFilterForm: FormGroup;

    /**
     * Edit path of parameter
     *
     * @type string
     */
    editPath: string;


    editDisable: boolean = true;

    /**
     * Selected id of a current row
     *
     * @type string
     */
    selectedId: string;

    meta: any;

    parameterData: Parameters[];

    colsList;

    totalColsList;


    nodeGroupIds: NodeGroupId[];


    filterField: string[];


    table_loader: boolean;
    /**
     * for user edit
     * role && permission
     */
    disableE: boolean;

    constructor(
        private service: ParametersService,
        private nodeGroupIdService: NodeGroupIdService,
        private fb: FormBuilder,
        private role: ServerNameService
    ) {
    }


    ngOnInit() {
        this.checkPermission();
        this.meta = {
            page: 1,
            sort_by: 'external_id',
            sort_order: 'asc',
            target_nodes: 'ALL',
            categories: '',
            areSet: false
        };

        this.filterField = [
            "node_group_id",
            "param_key"
        ];

        this.colsList = RouterColsList;
        this.totalColsList = DisplayedRouterColsList;

        this.service.getNodeGroupId().subscribe(
            (data) => this.nodeGroupIds = data
        );
        this.getData();

        this.parameterFilterForm = this.fb.group({
            target_nodes: ["ALL"],
            categories: [""],
            areSet: [false]
        });


        this.service.currentMessage.subscribe(
            (data) => {
                // this.editDisable = true;
                let notToFetched = ["cancel", "default"];
                if (notToFetched.indexOf(data) < 0) {
                    this.getData();
                }
                // this.setPageTitle();
            }
        )

    }

    checkPermission(): void {
        let role = this.role.getRole();
        switch (role) {
            case API.read:
                this.disableE = true;
                break;
            case API.write:
                this.disableE = false;
                break;
            default:

        }
    }

    ngAfterViewInit() {
        this.parameterFilterForm.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap((data) => this.table_loader = true),
            switchMap((value) => this.service.filter(value, this.meta))
        ).subscribe(
            (data) => {
                this.table_loader = false;
                this.editDisable = true;
                this.parameterData = data;
            }
        );

        this.getTargetNodeList();
    }

    get field() {
        return this.parameterFilterForm.controls;
    }

    /**
     * Value type in filter box
     *
     * @param $event
     */
    searchValue($event): void {
        this.subText = $event;
    }


    /**
     * Set a page title
     *
     * @return void
     */
    // setPageTitle() : void {
    //     this.titleService.setTitle(PageTitle.GET);
    // }

    /**
     * Get a list of data
     *
     * @return void
     */
    getData() {
        this.table_loader = true;
        this.service.get(this.meta).subscribe(
            (data) => {
                this.table_loader = false;
                this.parameterData = data;
            }
        );
    }

    /**
     * Selected row
     *
     * @param $event
     */
    rowSelected($event) {
        this.selectedId = $event;
        this.editPath = "/main/configure/parameters/" + this.selectedId + "/edit";
        this.editDisable = false;
    }

    /**
     * When click on table header
     *
     * @param $event
     */
    sortEvent($event) {
        this.editDisable = true;
        this.meta.sort_order = $event.sort_order;
        this.meta.sort_by = $event.sort_by;
        this.setFormData();
        this.getData();
    }

    /**
     * When click on prev , next or go button of pagination
     *
     * @param $event
     */
    pageNumber($event) {
        this.editDisable = true;
        this.meta.page = $event;
        this.setFormData();
        this.getData();
    }

    private setFormData(): void {
        let data = this.parameterFilterForm.value;
        this.meta.target_nodes = data.target_nodes;
        this.meta.categories = data.categories;
        this.meta.areSet = data.areSet;
    }


    getTargetNodeList() {
        this.service.getTargetNodeId().subscribe(
            (data) => {
                this.nodeGroupIdService.setAction(data);
            }
        );
    }


}
