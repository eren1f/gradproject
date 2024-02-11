export class LoginResponse {
    status: string;
    message: string;
    role: string;

    constructor(status?: string, message?: string, role?: string) {
        this.status = status || '';
        this.message = message || '';
        this.role = role || '';
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string) {
        this.status = status;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string) {
        this.message = message;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string) {
        this.role = role;
    }
}