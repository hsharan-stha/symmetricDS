import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'c-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<any> = new EventEmitter();

    @Input() dialogWidth: string = "";

    @Input() action: string = '';

    @Input() dialogHeight: string;

    @Input() text: string;

    constructor() {
    }

    ngOnInit() {
    }

    // close() {
    //     this.visible = false;
    //     this.visibleChange.emit(this.visible);
    // }

}
