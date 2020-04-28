import { Link } from './../model/link.model';

const data : Link[] = [
    {
        code : "P",
        name : "Push"
    },
    {
        code : "W",
        name : "Wait for Pull"
    },
    {
        code : "R",
        name : "Route-only"
    }
];

export class LinkData {

    static get(){
        return data ;
    }

    static getByCode(code : string ) : String {
        let link : String  ;
        data.forEach(function(value){
            if(value.code == code){
                link = value.name ;
                return
            }
        });

        return link ;
    }

    static getByName(name : string) : String {
        let link : String  ;
        data.forEach(function(value){
            if(value.name == name){
                link = value.code ;
                return
            }
        });

        return link ;
    }
}

