
const IncludeOnData = [
    {
        code : "*",
        name : "All"
    },
    {
        code : "I",
        name : "Insert"
    },
    {
        code : "U",
        name : "Update"
    },
    {
        code : "D",
        name : "Delete"
    }
];

export class IncludeOn {

    static get(){
        return IncludeOnData ; 
    }

    static getByCode(code) : string {
        let name ; 
        for(let i=0;i<IncludeOnData.length;i++){
            if(IncludeOnData[i].code == code){
                name = IncludeOnData[i].name ; 
                break ; 
            }
        }
        if(typeof name != "undefined")
            return name
        
        return code ; 
    }
}