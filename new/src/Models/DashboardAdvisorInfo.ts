export class DashboardAdvisorInfo {
    private firstname: string;
    private lastname: string;
    private department: string;
    private web: string;
    private phonenumber: string;

    constructor(firstname: string, lastname: string, department: string, web: string, phonenumber: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.department = department;
        this.web = web;
        this.phonenumber = phonenumber;
    }

    getFirstname(): string {
        return this.firstname;
    }

    getLastname(): string {
        return this.lastname;
    }

    getDepartment(): string {
        return this.department;
    }

    getWeb(): string {
        return this.web;
    }

    getPhonenumber(): string {
        return this.phonenumber;
    }

    setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    setDepartment(department: string): void {
        this.department = department;
    }

    setWeb(web: string): void {
        this.web = web;
    }

    setPhonenumber(phonenumber: string): void {
        this.phonenumber = phonenumber;
    }
}