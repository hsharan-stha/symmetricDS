import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NodeGroupIdService {

    private actionSource = new BehaviorSubject([]);

    action = this.actionSource.asObservable();

    constructor() { }

    setAction(message ){
        this.actionSource.next(message);
    }
}
