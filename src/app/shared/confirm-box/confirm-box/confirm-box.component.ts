import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'confirm-box',
    templateUrl: './confirm-box.component.html',
    styleUrls: ['./confirm-box.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmBoxComponent implements OnInit {

    @Input() containerWidth: string = "";

    @Input() title: string;

    @Input() body: string;
    @Input() loader: boolean = false;

    //@Input() visisble : boolean = false ;

    @Output() confirmBtn: EventEmitter<Boolean> = new EventEmitter();

    @Output() cancelBtn: EventEmitter<Boolean> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    confirmBtnClick() {
        this.confirmBtn.emit(true);
    }

    cancelBtnClick() {
        this.cancelBtn.emit(true);
    }
}
