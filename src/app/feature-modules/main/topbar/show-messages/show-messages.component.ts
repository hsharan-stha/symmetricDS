import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopbarService} from "../service/topbar.service";

@Component({
    selector: 'app-show-messages',
    templateUrl: './show-messages.component.html',
    styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent implements OnInit {
    @Input() showDialog;
    @Input() loader;
    @Output() close = new EventEmitter();

    errorMessages;

    constructor(
        private topbarService: TopbarService
    ) {
    }

    ngOnInit() {
        this.getMessages();
    }

    getMessages(): void {
        this.topbarService.getData.subscribe(
            (data) => {
                if (typeof data !== "string") {
                    this.errorMessages = data;
                    this.loader = false;
                }
            }
        );
    }

    onCancel() {
        this.showDialog = !this.showDialog;
        this.close.emit(this.showDialog);
    }

    trackByFn(index, item) {
        return index; // or item.id
    }
}
