import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {interval, Observable} from 'rxjs';

import {AlertMessageService} from '@shared/services/alert-message.service';
import {Logging} from './../model/logging.model';
import {LoggingService} from './../services/logging.service';

@Component({
    selector: 'app-logging',
    templateUrl: './logging.component.html',
    styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit, OnDestroy, AfterViewChecked {

    @ViewChild("scrollToBottom") private scrollToBottom : ElementRef; 

    /**
     * Filter form Group
     *
     * @type FormGroup
     */
    filterForm: FormGroup;

    /**
     * Log data array
     *
     * @type Logging
     */
    loggings: Logging[];

    /**
     * Observable of auto refresh
     *
     * @type Observable
     */
    auto_refresh;

    /**
     * Loading value determine whether the data is loaded or not
     *
     * @type boolean
     */
    loading: boolean;

    constructor(
        private service: LoggingService,
        private fb: FormBuilder,
        private alertMessage: AlertMessageService
    ) {
    }

    ngOnInit() {
        this.createFilterForm();
        this.getData();
    }

    ngAfterViewChecked(){
        this.scrollToBottom.nativeElement.scrollTop = this.scrollToBottom.nativeElement.scrollHeight;
    }

    /**
     * Create filter form
     *
     * @return void
     */
    createFilterForm(): void {
        this.filterForm = this.fb.group({
            qty: ["1000", [Validators.pattern('[0-9 ]*'), Validators.required]],
            filters: [""]
        });
    }


    /**
     * Get a list of logs
     *
     * @return void
     */
    getData(): void {
        this.loading = true;
        if (this.filterForm.valid) {
            this.service.getData(this.filterForm.value).subscribe(
                (data) => {
                    this.loggings = data;
                },
                (error) => {
                    this.alertMessage.show({
                        message: 'Failed',
                        alertType: 'danger'
                    });
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                     
                }
            );
        }

    }

    /**
     * Value type in filter box
     *
     * @param value
     * @return void
     */
    searchValue(value): void {
        this.filterForm.controls.filters.setValue(value);
    }

    /**
     * When click on refresh btn
     *
     * @return void
     */
    submit(): void {
        this.getData();
    }

    /**
     * When value of Auto Refresh is changes
     *
     * @param $event
     */
    autoRefreshChange($event) {
        if ($event.target.checked) {
            this.auto_refresh = interval(2000).subscribe(
                () => {
                    this.getData();
                }
            );
        } else {
            this.unsubscribeAutoRefresh();
        }
    }

    ngOnDestroy() {
        this.unsubscribeAutoRefresh();
    }

    /**
     * Unsubscribe the auto refresh observable 
     * 
     * @return void 
     */
    unsubscribeAutoRefresh() : void {
        if (this.auto_refresh)
            this.auto_refresh.unsubscribe();
    }


    trackByFuntion(index, item){
        return index ; 
    }

}
