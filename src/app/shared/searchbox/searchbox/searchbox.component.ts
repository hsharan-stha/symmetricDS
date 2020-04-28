import {Component, Input, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
    selector: 'searchbox',
    templateUrl: './searchbox.component.html',
    styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

    subText : string ;

    @Input() text: string;

    /**
     * Emit the output event with search text value
     *
     * @type EventEmitter
     */
    @Output() searchText : EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    search($event : KeyboardEvent){
        this.searchText.emit(this.subText);
    }
}
