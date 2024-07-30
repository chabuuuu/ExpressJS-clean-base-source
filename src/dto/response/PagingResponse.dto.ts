import { RequestPageable } from "@/dto/request/RequestPagable.dto";

export class PagingResponse <T> {
    public records = 0;
    public items : Array<T>;
    public pages : number;
    public page : number;
    public recordFrom : number;
    public recordTo : number;

    constructor(records: number, items: Array<T>, requestPageable : RequestPageable){
        this.items = items;
        this.records = records;
        this.pages = Math.ceil(records / requestPageable.rpp);
        this.page = requestPageable.page;
        this.recordFrom = (requestPageable.rpp * (requestPageable.page - 1)) + 1;
        this.recordTo = (requestPageable.rpp * requestPageable.page) > records ? records : (requestPageable.rpp * requestPageable.page);
    }
    
}