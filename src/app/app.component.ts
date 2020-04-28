import {Component, OnInit, NgZone} from '@angular/core';
import {TitleService} from "@shared/services/title.service";
import { AuthService } from '@shared/services/auth.service';
import { AlertMessageService } from '@shared/services/alert-message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
    constructor(private titleService: TitleService , private authService : AuthService,private ngZone: NgZone) {
    }

    ngOnInit(): void {
        this.titleService.init();
    }
}
