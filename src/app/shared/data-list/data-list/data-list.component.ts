import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ElementRef,
    ViewChildren, QueryList, ViewChild
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
    selector: 'data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit, OnChanges {
    displayedColumns1;
    @Input() mode: 'manage' | 'configure' = 'configure';
    @Input() displayedColumns;
    @Input() filterField;
    @Input() columnsList;
    @Input() datas;
    @Input() datas_load_data;

    /** for row to be selected
     in step one
     in load data
     on clicking previous button
     */
    @Input() selectedNodeID;

    /**
     * for design table heading
     * at step 2 of 2
     */
    @Input() forTwoOfTwo;

    /**
     * for scroll pagination
     * stop if data is less than zero
     */
    @Input() isMoreDataExists;

    @Output() selectedRow: EventEmitter<string> = new EventEmitter();
    @Output() sortOrder: EventEmitter<string> = new EventEmitter();
    @Output() pageAtBottom: EventEmitter<boolean> = new EventEmitter();
    @Output() page: EventEmitter<number> = new EventEmitter();
    @Input() filterText;
    columnsForm: FormGroup;
    group: any = {};
    toggle: boolean = false;
    @Input() table_loader: boolean;
    @Input() tableHeaderLoader: boolean;
    @Input() pagination: boolean = true;
    selectedId: string;
    pageNumber: number;
    scrollPageNumber: number = 1;
    @Input() headLoader: boolean;

    dataTotalLength;

    @ViewChildren("rowCheckBox") rowCheckBox: QueryList<ElementRef>;

    @ViewChild("headerCheckBox") headerCheckBox: ElementRef;

    @Output() manageRowSelectedId = new EventEmitter();

    selectedIdArray: string[];

    constructor(private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.displayedColumns1 = this.cloneTableColList(this.columnsList);
        this.displayedColumns1.forEach(col => {
            this.group[col.property] = new FormControl(true)
        });

        this.columnsForm = new FormGroup(this.group);


    }

    ngOnChanges(changes: SimpleChanges) {
        let value: any = "";
        if (changes['datas']) {
            value = changes['datas'];
        }
        this.checkChanges(value);

        /** for row selected
         while checking for previous page
         on load data step one
         */
        this.selectedId = this.selectedNodeID;
    }

    checkChanges(value): void {
        let data = value;
        if (Array.isArray(data['currentValue'])) {
            this.dataTotalLength = data['currentValue'].length;
        }
    }

    cloneTableColList(colList) {
        return JSON.parse(JSON.stringify(colList));

    }

    toggleSelectList() {
        this.toggle = !this.toggle;
    }

    selectRow(id: string) {
        this.selectedId = id;
        this.selectedRow.emit(id);
    }

    checkedClickRow(currentRow, id : string){
       
        if (!Array.isArray(this.selectedIdArray)) {
            this.selectedIdArray = [];
        }
        let that = this ; 
        let arrayIndex = this.selectedIdArray.indexOf(id);
        this.rowCheckBox.forEach(function (element, index) {
            if(currentRow == index ){
                
                
                element.nativeElement.checked =  !element.nativeElement.checked;
                if (element.nativeElement.checked && arrayIndex < 0) {
                    that.selectedIdArray.push(id);
                }

                if (element.nativeElement.checked && arrayIndex < 0) {
                    that.selectedIdArray.splice(arrayIndex, 1);
                }
                element.nativeElement.dispatchEvent(new Event('change'));
                return ; 
            } 
        });

        this.manageRowSelectedId.emit(this.selectedIdArray);
    }


    /**
     * Set a selected value in an array
     *
     * @param $event
     * @param id
     */
    selectedRowManage($event, id: string) {

        if (!Array.isArray(this.selectedIdArray)) {
            this.selectedIdArray = [];
        }

        let index = this.selectedIdArray.indexOf(id);
        if ($event.target.checked && index < 0) {
            this.selectedIdArray.push(id);
        }

        if (!$event.target.checked && index > -1) {
            this.selectedIdArray.splice(index, 1);
            this.headerCheckBox.nativeElement.checked = false;
        }
        this.manageRowSelectedId.emit(this.selectedIdArray);

    }

    /**
     * This method will be called when a header checkbox is change
     *
     * @param $event
     */
    headerCheckBoxChange($event) {
        if ($event.target.checked) {
            this.setRowCheckBoxValue(true);
        } else {
            this.setRowCheckBoxValue(false);
        }
    }

    /**
     * Set the value for each checkbox of table in row
     *
     * @param value
     */
    setRowCheckBoxValue(value: boolean): void {
        this.rowCheckBox.forEach(function (element) {
            element.nativeElement.checked = value;
            element.nativeElement.dispatchEvent(new Event('change'));
        });
    }


    selected(col: any) {


        let as;
        if (this.columnsForm.get(col.property).value) {

            this.columnsForm.get(col.property).setValue(false);

            this.displayedColumns1.find((o, i) => {

                if (o.property == col.property) {
                    as = i;
                    return true;
                }
            });
            this.displayedColumns1.splice(as, 1);

        } else {
            let alreadyInCol;
            this.columnsForm.get(col.property).setValue(true);
            this.columnsList.find((o, i) => {
                if (o.property == col.property) {
                    as = i;
                    return true;
                }
            });

            this.displayedColumns1.find((o, i) => {

                if (o.property == col.property) {
                    alreadyInCol = i;
                    return true;
                }
            });

            if (typeof alreadyInCol == "undefined") {
                let gdIndex;

                for (let i = as - 1; i >= 0; i--) {
                    let displayed = this.columnsList[i];
                    this.displayedColumns1.find((o, i) => {

                        if (o.property == displayed.property) {
                            gdIndex = i
                            return true;
                        }
                    });
                    if (typeof gdIndex != "undefined")
                        break;
                }

                if (typeof gdIndex == "undefined") {
                    this.displayedColumns1.splice(0, 0, col);
                } else {
                    this.displayedColumns1.splice(gdIndex + 1, 0, col);
                }
            }
        }
    }

    sortTable(sortOrder) {
        this.sortOrder.emit(sortOrder);
    }

    getPageNumber($event) {
        if (this.headerCheckBox)
            this.headerCheckBox.nativeElement.checked = false;
        this.pageNumber = $event;
        this.page.emit(this.pageNumber);
    }

    scrollPage($event) {
        if ($event && this.isMoreDataExists) {
            this.scrollPageNumber++;
        }
        if (!this.isMoreDataExists) {
            this.scrollPageNumber = 1;
        }
        this.page.emit(this.scrollPageNumber);
    }

    searchValue($event) {
        this.filterText = $event;
    }

}
