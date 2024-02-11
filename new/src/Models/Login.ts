export class Login {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    get getEmail() {
        return this.email;
    }

    set setEmail(email: string) {
        this.email = email;
    }

    get getPassword() {
        return this.password;
    }

    set setPassword(password: string) {
        this.password = password;
    }
}