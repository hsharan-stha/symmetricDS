import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-tabhead',
    templateUrl: './tabhead.component.html',
    styleUrls: ['./tabhead.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabheadComponent implements OnInit {
    @Input() text: string;

    constructor() {
    }

    ngOnInit() {
    }

}
