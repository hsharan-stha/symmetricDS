import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent implements OnInit {

    /**
     * Form group name
     *
     * @type FormGroup
     */
    @Input() groupName : string ;

    /**
     * Form control name
     *
     * @type string
     */
    @Input() name : string ;

    /**
     * Checkbox label
     *
     * @type string
     */
    @Input() label : string ;

    /**
     * Checkbox id
     *
     * @type string
     */
    @Input() formId : string ;

    @Output() valueChanges :  EventEmitter<Boolean> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onChange($event){
        this.valueChanges.emit(true);
    }

}
