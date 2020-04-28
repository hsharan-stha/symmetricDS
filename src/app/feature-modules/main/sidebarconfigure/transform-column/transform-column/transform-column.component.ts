import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {TransformTableService} from '@sidebarconfigure/transform-table/service/transform-table.service';
import {TransformTypeService} from '../services/transform-type.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranformColumnService} from '../services/tranform-column.service';
import {ColsList} from '../data/cols.table';
import {TransformType} from '../model/transform-type.model';
import {debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-transform-column',
    templateUrl: './transform-column.component.html',
    styleUrls: ['./transform-column.component.css']
})
export class TransformColumnComponent implements OnInit {

    transformTableList;

    transfromColumnList;

    columnList;

    filterField;

    meta;

    selectedId;

    /**
     * Value type in filter box
     *
     * @type string
     */
    subText: string;

    table_loader: boolean;

    deleteUrl: string;

    crudButtonClass: string = "unclickable";

    createUrl: string;

    editUrl: string;

    constructor(
        private service: TranformColumnService,
        private transformTable: TransformTableService,
    ) {
    }

    ngOnInit() {

        this.meta = {
            sort_by: 'transform_id',
            sort_order: 'asc',
            page: 1
        };


        this.getData();

        this.columnList = ColsList;

        this.filterField = [
            "transform_id",
            "target_column_name",
            "source_column_name"
        ]

        console.log("After view checked");
        this.getTransformTable();

        this.service.currentMessage.subscribe(
            (data) => {
                let notToFetched = ["cancel", "default"];
                if (notToFetched.indexOf(data) < 0) {

                    this.getData();
                    this.crudButtonClass = "unclickable";

                }

            }
        )

        this.createUrl = "/main/configure/transform-column/create";

    }

    getData() {
        this.table_loader = true;
        this.service.get(this.meta).subscribe(
            (data) => {
                console.log(data)
                this.transfromColumnList = data;
                this.table_loader = false;

            }
        );
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

    /**
     * Called when a row is selected.
     *
     * @param id
     */
    rowSelected(id: number) {
        this.selectedId = id;
        this.deleteUrl = "/main/configure/transform-column/" + id + "/delete";
        this.editUrl = "/main/configure/transform-column/" + id + "/edit";
        this.crudButtonClass = "clickable";
    }


    sortEvent($event) {
        this.crudButtonClass = "unclickable";
        this.meta.sort_order = $event.sort_order;
        this.meta.sort_by = $event.sort_by;
        this.getData();
    }

    pageNumber($event) {
        this.crudButtonClass = "unclickable";
        this.meta.page = $event;
        this.getData();
    }

    /**
     * Value type in filter box
     *
     * @param $event
     */
    searchValue($event): void {
        this.subText = $event;
    }
}
