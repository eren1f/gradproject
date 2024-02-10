export class RequestTypes {
    private requestName: string;
    private id: number;

    constructor(requestName: string, id: number) {
        this.requestName = requestName;
        this.id = id;
    }

    public getRequestName(): string {
        return this.requestName;
    }

    public getId(): number {
        return this.id;
    }

    public setRequestName(requestName: string): void {
        this.requestName = requestName;
    }

    public setId(id: number): void {
        this.id = id;
    }
}