export class UserInfo {
    private id: number;
    private name: string;
    private surname: string;
    private email: string;
    private departmentId: number;
    private adviserId: number; // this has to advisor or staff 
    private password: string;
    private role: string;
    private fullName: string;
    private firstname: string;
    private lastname: string;
    private advisorId: number;

    constructor(id: number, name: string, surname: string, email: string, departmentId: number, adviserId: number, password: string, role: string, fullName: string, firstname: string, lastname: string, advisorId: number) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.departmentId = departmentId;
        this.adviserId = adviserId;
        this.password = password;
        this.role = role;
        this.fullName = fullName;
        this.firstname = firstname;
        this.lastname = lastname;
        this.advisorId = advisorId;
    }
    public getFullName(): string {
        return this.fullName;
    }
    public getFirstname(): string {
        return this.name;
    }
    public getLastname(): string {
        return this.surname;
    }
    public getRole(): string {
        return this.role;
    }
    public setRole(role: string){
        this.role = role;
    }

    public getId(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getDepartmentId(): number {
        return this.departmentId;
    }

    public getAdviserId(): number {
        return this.adviserId;
    }
}


