export class DiscountReason {
    id: string;
    discountReason: string;
    //discountReasonCode: string;
    active: boolean

    constructor(){
        this.id = '',
        this.discountReason = '',
      //  this.discountReasonCode = '',
        this.active = false 
    }
}
