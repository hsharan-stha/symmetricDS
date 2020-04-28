import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {API} from "@config/url";
import {SidebarService} from '@shared/sidebar/sidebar.service';
import {TopbarService} from "./service/topbar.service";


@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, AfterViewChecked {

    /**
     * Name of node server
     *
     * @type string
     */
    node: string = "";

    /**
     * Username of login user
     *
     * @type string
     */
    username: string = "";

    /**
     * Determine whether the sidebar is toggled or not
     *
     * @type boolean
     */
    toggled: boolean = false;

    showMessagesDialog: boolean;

    countError: number;

    loader: boolean;

    constructor(
        private authService: AuthService,
        private sidebarService: SidebarService,
        private topbarService: TopbarService
    ) {
    }

    ngOnInit() {
        this.getErrorCount();
    }

    ngAfterViewChecked(): void {
        this.sidebarService.setMessage(this.toggled);
        this.node = localStorage.getItem(API.nodeServerName);
        this.username = this.authService.getUsername();
    }

    getErrorCount(): void {
        this.topbarService.getErrorCount().subscribe(
            data => {
                if (data.responceCode === 0) {
                    this.countError = data.result.cnt;
                }
            }
        );
    }

    /**
     * Logout a user from interface
     *
     * @return void
     */
    logout(): void {
        this.authService.logoutUser().subscribe(
            (data) => {
                if (data) {
                    this.authService.setMessage("");
                    this.authService.sessionDestroy();
                }
            }
        );

    }

    /**
     * When click on toggle button
     *
     * @return void
     */
    toggle(): void {
        this.toggled = !this.toggled;
        this.sidebarService.setMessage(this.toggled);
    }

    getErrorMessage(): void {
        this.showMessagesDialog = true;
        this.loader = true;
        this.topbarService.getErrorMessages().subscribe(
            (data) => {
                this.topbarService.setData(data);
            }
        )
    }

    closeDialog($event) {
        this.showMessagesDialog = $event;
    }
}
