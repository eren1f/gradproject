export class LogoutResponse {
    status: string;
    message: string;

    constructor(status?: string, message?: string) {
        this.status = status || '';
        this.message = message || '';
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
}