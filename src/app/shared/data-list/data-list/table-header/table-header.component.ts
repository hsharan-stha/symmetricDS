import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-table-header',
    templateUrl: './table-header.component.html',
    styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
    
    @Input() title: string;

    @ViewChild("iconasc") asc: ElementRef;

    @ViewChild("icondesc") desc: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

}
