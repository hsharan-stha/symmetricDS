import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertMessageService} from '@shared/services/alert-message.service';
import {GroupLinksService} from './../services/group-links.service'; 
import {Messages} from './../data/message.enum';

@Component({
    selector: 'delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

    /**
     * Id of group links to be delete
     *
     * @type string
     */
    selectedId: string;

    /**
     * Loading icon
     *
     * @type {boolean}
     */
    loader: boolean = false;

    constructor(
        private service: GroupLinksService,
        private router: Router,
        private alertMessage: AlertMessageService
    ) {
    }

    ngOnInit() {
        this.extractId(this.router.url);
        console.log("Ng On init group links Delete");
    }

    /**
     * Extract id from url
     *
     * @param url
     */
    extractId(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "delete") {
            this.selectedId = explode[explode.length - 2];
        }
    }

    /**
     * Delete a details when click on delete button
     *
     * @param status
     */
    deleteBtn(status) {
        this.loader = true;
        this.service.delete(this.selectedId).subscribe(
            (data) => {
                this.checkStatus(data);
            },
            (error) => {
                if (error.error.responceCode < 0) {
                    this.checkStatus(error.error);
                }
            }
        )
    }

    /**
     * Cancel button is clicked from confirm box
     * @param status
     */
    cancelBtn(status) {
        this.service.changeMessag("cancel");
        this.alertMessage.cancel();
        this.router.navigate(["/main/configure/group-links/"]);
    }

    /**
     * Check a status of message
     * @param response
     */
    checkStatus(response) {
        if (response['responceCode'] === 0) {
            this.alertMessage.show({
                message: Messages.DELETE_SUCCESS,
                alertType: "success"
            });
            this.service.changeMessag("delete");
            this.router.navigate(["/main/configure/group-links/"]);
        } else {
            this.alertMessage.show({
                message: response.result,
                alertType: "danger"
            });
        }
        this.loader = false;
    }
}
