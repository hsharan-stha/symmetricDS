import { Injectable } from '@angular/core';
import { Link } from './../model/link.model';
import { Adapter } from '@core/adapter';

@Injectable()
export class LinkAdapter implements Adapter<Link>{

    adapt(item : any) : Link{
        return new Link(
            item.id ,
            item.name
        )
    }

}