import {Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ServerNameService} from "@shared/services/server-name.service";
import { SidebarService } from '../sidebar.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

    @Input() datas;

    sidebarToggled ;
 
    constructor(private cdr : ChangeDetectorRef,  private role: ServerNameService , private sidebarService : SidebarService) {
    }

    ngOnInit() {
        this.removeUserTab();
        
        this.sidebarService.messageSource.subscribe(
            (data)=>{
                this.sidebarToggled = data ; 
                this.cdr.detectChanges()
            }
        );
    }

    trackById(index, value) {
        return index + "-" + value.path;
    }

    removeUserTab(): void {
        if (this.datas.length === 12) {
            let role = this.role.getRole();
            switch (true) {
                case role !== "admin":
                    this.datas = this.datas.slice(0, -1);
                    break;
                default:

            }
        }
    }

}
