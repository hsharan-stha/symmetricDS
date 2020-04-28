
class FilterForm{

    constructor(
        public channel_id : string
    ){}
}

export class FilterFormStatus extends FilterForm{

    public status : string ;

    constructor(channel_id : string, status : string ){
        super(channel_id);
        this.status = status  ;
    }
}

export class FilterFormErrorFlag extends  FilterForm{
    public error_flag : number ;

    constructor(channel_id : string, error_flag : number ){
        super(channel_id);
        this.error_flag = error_flag  ;
    }
}