import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

@Component({
    selector: 'select-with-loading',
    templateUrl: './select-with-loading.component.html',
    styleUrls: ['./select-with-loading.component.css']
})
export class SelectWithLoadingComponent implements OnInit, OnChanges {
    @Output() channelID = new EventEmitter();
    @Input() label: string;

    @Input() datas;

    @Input() groupName;

    @Input() controlName;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit() {
    }

    selectChange($event) {
        this.channelID.emit($event.currentTarget.value);
    }

    trackByCode(index, item){
        return item.code ; 
    }

}
