import { RouterType } from './../model/router-type.model';

const data = [
    "default",
    "lookuptable",
    "subselect",
    "bsh",
    "audit",
    "tps",
    "csv",
    "column",
    "dbf"
];

export class RouterTypeData {

    static get(){
        return data ;
    }
}
