import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'select-with-loading',
  templateUrl: './select-with-loading.component.html',
  styleUrls: ['./select-with-loading.component.css']
})
export class SelectWithLoadingComponent implements OnInit {

    @Input() label : string ;

    @Input() datas ;

    @Input() groupName ;

    @Input() controlName ;

    constructor() { }

    ngOnInit() {
    }

}
