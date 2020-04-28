import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {TransformTableService} from "@sidebarconfigure/transform-table/service/transform-table.service";
import {Messages} from "@sidebarconfigure/transform-table/data/message.enum";
import {Constant} from "@sidebarconfigure/transform-table/data/constant-value.enum";

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
    showConfirmBox: boolean = true;
    buttonDisabledClass: string;
    path: string;
    loader: boolean = false;
    extract;

    constructor(private router: Router, private transformTableService: TransformTableService, private alertService: AlertMessageService) {
    }

    ngOnInit() {
        this.extract = this.router.url.split("/");
        this.path = this.extract[1] + '/' + this.extract[2] + '/' + this.extract[3];
    }

    confirm($event) {
        if ($event) {
            if ("delete" == this.extract[this.extract.length - 1]) {
                this.loader = true;
                let id = this.extract[this.extract.length - 2];
                this.transformTableService.delete(id).subscribe(
                    data => {
                        if (data['responceCode'] === 0) {
                            this.success(Messages.DELETE_SUCCESS);
                        } else {
                            this.failure(data['result']);
                        }
                    }, (data) => {
                        this.failure(data['error']['result']);
                    }
                );
            }
        }
    }

    cancel($event) {
        if ($event) {
            this.showConfirmBox = false;
            this.buttonDisabledClass = Constant.UNCLICKABLE;
            this.router.navigateByUrl(this.path);
        }
    }

    failure(message): void {
        this.loader = false;
        this.alertService.show({
            message: message,
            alertType: "danger"
        });
    }

    success(message): void {
        this.transformTableService.setMessage(Constant.UNCLICKABLE);
        this.alertService.show({
            message: message,
            alertType: "success"
        });
        this.loader = false;
        this.showConfirmBox = false;
        this.router.navigateByUrl(this.path);
    }
}
