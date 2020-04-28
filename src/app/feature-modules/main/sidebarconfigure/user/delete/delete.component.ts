// import { Title }     from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertMessageService} from '@shared/services/alert-message.service';
// import { PageTitle } from './../data/page-title.enum';
import {Messages} from './../data/message.enum';
import {Button} from './../data/button.enum';

import {UserService} from './../services/user.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

    /**
     * Determine whether to show loader button or not
     *
     * @type {boolean}
     */
    loader: boolean;

    /**
     * Determine which details is to be deleted
     *
     * @type string
     */
    selectedId: string;

    constructor(
        private router: Router,
        // private titleService : Title,
        private service: UserService,
        private alertMessage: AlertMessageService
    ) {
    }

    ngOnInit() {
        // this.titleService.setTitle(PageTitle.DELETE);
        this.extractId(this.router.url);
    }

    /**
     * Geta a id from url
     *
     * @param url
     */
    private extractId(url: string) {
        let explode = url.split("/");
        if (explode[explode.length - 1] == "delete") {
            this.selectedId = explode[explode.length - 2];
        }
    }

    /**
     * Navigate to main page
     *
     * @return void
     */
    private navigateToMainPage(): void {
        this.router.navigate(["/main/configure/user"]);
    }


    /**
     * When click on delete button
     *
     * @param $event
     */
    deleteBtn($event) {
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
     * When click on cancel button
     *
     * @param $event
     */
    cancelBtn($event) {
        this.service.setAction("cancel");
        this.alertMessage.cancel();
        this.navigateToMainPage();

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
            this.service.setAction("delete");
            this.navigateToMainPage();
        } else {
            this.alertMessage.show({
                message: response.result,
                alertType: "danger"
            });
        }
        this.loader = false;
    }
}
