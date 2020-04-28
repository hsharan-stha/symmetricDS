import {Component, OnInit} from '@angular/core';
import {UserService} from './../services/user.service';
import {User} from './../model/user.model'
import {TableColumns} from './../cols.table';
 
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    createPath: string;

    deletePath: string;

    editPath: string;

    crudButtonClass: string = "unclickable";

    query;

    showDialog = false;

    userData: User[];

    /**
     * Value type in search box
     *
     * @type string
     */
    subText: string;

    /**
     * Currently selected row id
     *
     * @type string
     */
    selectedId: string;


    buttonDisabledClass: string = "unclickable";

    filterField: object;

    table_loader: boolean;


    userColumnList;


    constructor( 
        private service: UserService
    ) {
    }

    ngOnInit() {
        this.createPath = "/main/configure/user/create";
        this.userColumnList = TableColumns;

        this.query = {
            sort_by: "role_id",
            sort_order: "asc",
            page: 1
        };

        this.filterField = ['username', 'role_id'];

        this.getData();

        this.service.action.subscribe(
            (data) => {

                let notToFetched = ["cancel", "default"];
                if (notToFetched.indexOf(data) < 0) {
                   
                    this.getData();

                    this.crudButtonClass = "unclickable";

                }
                
            }
        )
 
    }

 

    getData() {
        this.table_loader = true;
        this.service.get(this.query).subscribe(
            (data) => {
                this.userData = data;
                this.table_loader = false;
            }
        )
    }


    rowSelected($event) {
        this.selectedId = $event;
        this.editPath = "/main/configure/user/" + this.selectedId + "/edit";
        this.deletePath = "/main/configure/user/" + this.selectedId + "/delete";
        this.crudButtonClass = "clickable";
    }


    search($event) {
        this.subText = $event;
    }

    sortEvent($event) {
        this.crudButtonClass = "unclickable";
        this.query.sort_order = $event.sort_order;
        this.query.sort_by = $event.sort_by;
        this.getData();
    }

    pageNumber($event) {
        this.crudButtonClass = "unclickable";
        this.table_loader = true;
        this.query.page = $event;
        this.getData();
    }

}
