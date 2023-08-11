export class ResponseModel {
    message: string;
    status : string;
    code: string;
    data: any;

    constructor(){
        this.message ='',
        this.status = '',
        this.code = '',
        this.data = ''
    }
}
