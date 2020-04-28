import {Injectable} from '@angular/core'; 
import {BehaviorSubject, Subject} from 'rxjs';
 
@Injectable({
    providedIn : 'root'
})

export class SidebarService {

    private messages = new Subject();
    
    messageSource = this.messages.asObservable();

    
    constructor() { }

    setMessage(message: boolean ) {
        this.messages.next(message);
    }

    
}