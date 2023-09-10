export class User {
    id: string;
    role: string;
    email: string;
    password: string;
    confirmPassword: string;
    active: boolean;
    
   
    constructor(){
        this.id = ''; 
        this.role = ''; 
        this.email = ''; 
        this. password = '';
        this.confirmPassword = ''; 
        this.active = false;
    }
}
