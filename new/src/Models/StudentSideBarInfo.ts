export class StudentSideBarInfo {
    private firstName: string;
    private lastname: string;
    private id: number;

    constructor(firstName: string, lastname: string, id: number) {
        this.firstName = firstName;
        this.lastname = lastname;
        this.id = id;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastname;
    }

    getId() {
        return this.id;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    setLastName(lastname: string) {
        this.lastname = lastname;
    }

    setId(id: number) {
        this.id = id;
    }
}