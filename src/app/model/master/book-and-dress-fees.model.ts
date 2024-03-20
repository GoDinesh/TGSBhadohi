export class BookAndDressFees {
    id: string;
    standard: string;
    academicYearCode: string;
    bookFees: string;
    // boyDressFees: string;
    // girlDressFees: string;
    active: boolean;

    constructor(){
        this.id='';
        this.standard = '';
        this.academicYearCode = '';
        this.bookFees = '';
        // this.boyDressFees = '';  
        // this.girlDressFees = '';
        this.active  = true;
    }
}
