import {Injectable} from '@angular/core';
import {API} from '@config/url';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable()
export class NodeGroupIdService {

    private source = new BehaviorSubject([]);

    dataSource = this.source.asObservable();

    constructor() {
    }

    changeData(data) {
        this.source.next(data);
    }


}
