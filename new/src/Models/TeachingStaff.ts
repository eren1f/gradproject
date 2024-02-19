export class TeachingStaff{
    private name: string;
    private surname: string;
    private id?: number;
    private email: string;
    private password: string;
    private role: string;
    private departmentId: number;

    constructor(name: string, surName: string, email:string, password:string, role:string, departmentId:number){
        this.name = name;
        this.surname = surName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.departmentId = departmentId;
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

}