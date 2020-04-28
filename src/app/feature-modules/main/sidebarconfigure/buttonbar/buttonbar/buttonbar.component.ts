import {Component, EventEmitter, OnInit, Output, Input, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from "@shared/services/auth.service";
import {ServerNameService} from "@shared/services/server-name.service";
import {API} from "@config/url";

@Component({
    selector: 'app-buttonbar',
    templateUrl: './buttonbar.component.html',
    styleUrls: ['./buttonbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonbarComponent implements OnInit {

    @Output() searchBoxData = new EventEmitter();

    @Input() buttonClass: string = "unclickable";
    @Input() disableNE: boolean = false;
    @Input() disableD: boolean = false;
    @Input() selectedId: string = "";
    @Input() createpath: string;
    @Input() editpath: string;
    @Input() deletepath: string;

    constructor(private role: ServerNameService) {
    }

    ngOnInit() {
        let role = this.role.getRole();
        switch (role) {
            case API.read:
                this.disableNE = true;
                this.disableD = true;
                break;
            case API.write:
                this.disableNE = false;
                this.disableD = true;
                break;
            default:

        }
    }

    searchValue($event) {
        this.searchBoxData.emit($event);
    }
}
