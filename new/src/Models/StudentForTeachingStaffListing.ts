export class StudentForTeachingStaffListing {
    private id: number;
    private fullName: string;
    private email: string;
    private department: string;
    private requestTypeName:string;
    [key: string]: any;
    
    constructor(id: number, fullName: string, email: string, department: string, requestTypeName: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.requestTypeName = requestTypeName;
    }

    public getId(): number {
        return this.id;
    }

    public getFullName(): string {
        return this.fullName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getDepartment(): string {
        return this.department;
    }

    public getRequestTypeName(): string {
        return this.requestTypeName;
    }
}