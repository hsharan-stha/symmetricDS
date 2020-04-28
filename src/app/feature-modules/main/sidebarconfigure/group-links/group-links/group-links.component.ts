import {Component, OnInit} from '@angular/core';

import {GroupLinksService} from './../services/group-links.service';
import {GroupLinks} from './../model/group-links.model';
import {DisplayedCols} from './../cols.table';

import {NodeGroupIdService} from './../services/node-group-id.service';

@Component({
    selector: 'app-group-links',
    templateUrl: './group-links.component.html',
    styleUrls: ['./group-links.component.css']
})
export class GroupLinksComponent implements OnInit {


    groupLinkData: GroupLinks[];

    /**
     * Determine whether row is selected or not
     *
     * @type boolean
     */
    isRowSelected: boolean = false;

    /**
     * Current selected group links id
     *
     * @type number
     */
    selectedId: number;


    /**
     * CRUD button class
     *
     * @type string
     */
    crudButtonClass: string = "unclickable";

    /**
     * Text type in search box
     *
     * @type string
     */
    subText: string;

    groupLinkColumns: any;

    createpath: string;

    editpath: string;

    deletepath: string;

    filterField: string[];

   
    table_loader: boolean;

    meta: any;


    constructor(
        private service: GroupLinksService,
        private nodeGroupIdService: NodeGroupIdService
    ) { }

    ngOnInit() {
        this.meta = {
            sort_by: 'source_node_group_id',
            sort_order: 'asc',
            page: 1
        };

        this.createpath = "/main/configure/group-links/create";

        this.service.currentMessage.subscribe(
            (data) => {
                let notToFetched = ["cancel", "default"];
                if (notToFetched.indexOf(data) < 0) {
                    
                    this.getData();
                    this.crudButtonClass = "unclickable";

                }
                
            }
        )

        this.groupLinkColumns = DisplayedCols;

        this.getNodeGroupId();

        this.filterField = [
            "source_group_id",
            "target_group_id"
        ]

        this.getData();


    }

    /**
     * Value type in filter box
     *
     * @param $event
     */
    searchValue($event) {
        this.subText = $event;
    }

    /**
     * Get a node group id list
     *
     * @return void
     */
    getNodeGroupId() {
        this.nodeGroupIdService.get().subscribe(
            (data) => {
                this.nodeGroupIdService.changeData(data);
            }
        );
    }


    getData() {
        this.table_loader = true;
        this.service.get(this.meta).subscribe(
            (data) => {
                this.groupLinkData = data;
                this.table_loader = false;

            }
        )
    }


    /**
     * Called when a row is selected.
     *
     * @param id
     * @return void 
     */
    rowSelected(id: number) : void {
        this.selectedId         = id;
        this.isRowSelected      = !this.isRowSelected;
        this.crudButtonClass    = "clickable";
        this.editpath           = "/main/configure/group-links/" + id + "/edit";
        this.deletepath         = "/main/configure/group-links/" + id + "/delete";
    }

    /**
     * When click on table header 
     * 
     * @param $event 
     * @return void 
     */
    sortEvent($event) : void  {
        this.crudButtonClass    = "unclickable";
        this.meta.sort_order    = $event.sort_order;
        this.meta.sort_by       = $event.sort_by;
        this.getData();
    }

    /**
     * When click on pagination button 
     * 
     * @param $event 
     * @return void 
     */
    pageNumber($event) : void  {
        this.crudButtonClass    = "unclickable";
        this.meta.page          = $event;
        this.getData();
    }
}
