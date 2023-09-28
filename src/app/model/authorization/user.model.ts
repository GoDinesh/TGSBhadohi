export class User {
    id: string;
    role: string;
    groupid: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    active: boolean;
    
   
    constructor(){
        this.id = ''; 
        this.role = ''; 
        this.groupid = '';
        this.name = '';
        this.email = ''; 
        this.password = '';
        this.confirmPassword = ''; 
        this.active = false;
    }
}
