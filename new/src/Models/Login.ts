export class Login {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    get Username() {
        return this.username;
    }

    set Username(username: string) {
        this.username = username;
    }

    get Password() {
        return this.password;
    }

    set Password(password: string) {
        this.password = password;
    }
}