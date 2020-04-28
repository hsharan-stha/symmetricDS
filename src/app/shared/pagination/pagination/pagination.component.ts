import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
    paginationForm: FormGroup;
    @Input() pagination: boolean;
    prevDisabled: boolean;

    nextDisabled: boolean;

    goDisabled: boolean;
    pageNumber: number = 1;
    @Output() page: EventEmitter<number> = new EventEmitter();


    @Input() dataLength: number;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.paginationFormValue();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dataLength']) {
            let data = changes['dataLength'];
            this.goDisabled = false;


            if (data['previousValue'] < 1) {
                this.prevDisabled = true;
            } else {
                this.prevDisabled = false;
            }


            if (data['currentValue'] < 20) {
                this.nextDisabled = true;
            } else {
                this.nextDisabled = false;
            }

            if (data['currentValue'] > 1) {
                this.prevDisabled = false;
            }


            if (this.pageNumber == 1) {
                this.prevDisabled = true;
            }
        }
    }

    onNext($event) {
        this.pageNumber = $event;
        this.pageNumber++;
        this.disabledAllBtn();
        this.page.emit(this.pageNumber);
        this.setPageNumber(this.pageNumber);

    }

    onPrev($event) {
        this.pageNumber = $event;
        this.pageNumber--;
        this.disabledAllBtn();
        this.page.emit(this.pageNumber);
        this.setPageNumber(this.pageNumber);

    }

    /**
     * Disabled all pagination button
     *
     * @return void
     */
    disabledAllBtn(): void {
        if (this.dataLength === 20) {
            if (this.pageNumber === 1) {
                this.nextDisabled = false;
                this.goDisabled = false;
                this.prevDisabled = true;
            } else if (this.pageNumber > 1) {
                this.prevDisabled = false;
            }
        } else if (this.dataLength < 20) {
            this.nextDisabled = true;
            if (this.dataLength === 0 || this.pageNumber === 1)
                this.prevDisabled = true;
        }
    }

    onSubmit() {
        if (this.paginationForm.valid) {
            let data = this.paginationForm.value;
            let page_num = data['p_n'];
            this.pageNumber = page_num;
            this.disabledAllBtn();
            this.page.emit(this.pageNumber);
            this.setPageNumber(this.pageNumber);
        }
    }

    paginationFormValue(): void {
        this.paginationForm = this.fb.group({
            p_n: [this.pageNumber, [
                Validators.required,
                Validators.pattern('^[0-9_]*$')
            ]]
        });
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            this.onSubmit();
        }
    }

    setPageNumber(n) {
        this.paginationForm.setValue({p_n: n});
    }

}
