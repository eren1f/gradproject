export class TeachingStaff{
    private name: string;
    private surname: string;
    private id?: number;
    private email: string;
    private password: string;
    private role: string;
    private departmentId: number;
    private web: string;
    private phoneNumber: string;

    constructor(name: string, surName: string, email:string, password:string, role:string, departmentId:number, web:string, phoneNumber:string){
        this.name = name;
        this.surname = surName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.departmentId = departmentId;
        this.web = web;
        this.phoneNumber = phoneNumber;
    }
    // Getters and Setters


    getName(){
        return this.name;
    }

    setName(name: string){
        this.name = name;
    }

    getSurname(){
        return this.surname;
    }

    setSurname(surName: string){
        this.surname = surName;
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email: string){
        this.email = email;
    }

    getPassword(){
        return this.password;
    }

    setPassword(password: string){
        this.password = password;
    }

    getRole(){
        return this.role;
    }

    setRole(role: string){
        this.role = role;
    }

    getDepartmentId(){
        return this.departmentId;
    }

    setDepartmentId(departmentId: number){
        this.departmentId = departmentId;
    }

    getWeb(){
        return this.web;
    }
    setWeb(web: string){
        this.web = web;
    }

    getPhoneNumber(){
        return this.phoneNumber;
    }
    setPhoneNumber(phoneNumber: string){
        this.phoneNumber = phoneNumber;
    }

}