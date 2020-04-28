import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
 
@Component({
  selector: 'body-title',
  templateUrl: './body-title.component.html',
  styleUrls: ['./body-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyTitleComponent implements OnInit {

    @Input() text : string ;

    constructor() { }

    ngOnInit() {
    }

}
