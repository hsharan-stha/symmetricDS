import { Injectable } from '@angular/core';
import { Observable, of  } from 'rxjs';

import { Link } from './../model/link.model';
import { LinkData } from './../data/link.data';

@Injectable()
export class LinkService {

    constructor() { }

    get() : Observable<Link[]>{
       return of(LinkData.get());
    }
}
