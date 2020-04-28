
const ROLEDATA = [
    {
        id : "admin",
        name : "Admin"
    },
    {
        id : "read",
        name : "Read"
    },
    {
        id : "write",
        name : "Write"
    },
    {
        id : "write_delete",
        name : "Write_delete"
    }
];

export class Roles{

    static get(){
        return ROLEDATA;
    }

    static getById(id : string){
        let name : String  ;
        ROLEDATA.forEach(function(value){
            if(value.id == id){
                name = value.name ;
                return
            }
        });

        return name ;
    }
}