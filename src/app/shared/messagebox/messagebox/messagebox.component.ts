import {Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck, OnDestroy, NgZone} from '@angular/core';

@Component({
    selector: 'app-messagebox',
    templateUrl: './messagebox.component.html',
    styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit{

    /**
     * Determine whether to show alert message or not
     *
     * @type string
     */
    @Input() message : string ;

    /**
     * Message to be displayed in box
     *
     * @type boolean
     */
    //@Input() messagebox : boolean ;

    /**
     * Fade out time of message box
     *
     * @type {number}
     */
    @Input() setOutTime : number = 2000 ;

    /**
     * Alert type
     *
     * @type {string}
     */
    @Input() alertType : string = "success";

    constructor(private ngZone : NgZone) { }

    ngOnInit() { }
}
