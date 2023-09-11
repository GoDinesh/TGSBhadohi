export class User {
    id: string;
    role: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    active: boolean;
    
   
    constructor(){
        this.id = ''; 
        this.role = ''; 
        this.name = '';
        this.email = ''; 
        this. password = '';
        this.confirmPassword = ''; 
        this.active = false;
    }
}
