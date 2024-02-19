export class StaffForAdminListing {
    private id: number;
    private fullName: string;
    private email: string;
    private department: string;
    private role:string;

    constructor(id: number, fullName: string, email: string, department: string, role: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.role = role;
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

    public getRole(): string {
        return this.role;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setFullName(fullName: string): void {
        this.fullName = fullName;
    }
    
    public setEmail(email: string): void {
        this.email = email;
    }

    public setDepartment(department: string): void {
        this.department = department;
    }

    public setRole(role: string): void {
        this.role = role;
    }
    
}