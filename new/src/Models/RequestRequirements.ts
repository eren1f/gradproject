export class RequestRequirement {
    private requestTypeId: number;
    private index: number;
    private name: string;
    private type: string;
    description: string;

    constructor(requestTypeId: number, index: number, name: string, type: string, description: string) {
        this.requestTypeId = requestTypeId;
        this.index = index;
        this.name = name;
        this.type = type;
        this.description = description;
    }

    public getRequestTypeId(): number {
        return this.requestTypeId;
    }
    public getIndex(): number {
        return this.index;
    }
    public getName(): string {
        return this.name;
    }
    public getType(): string {
        return this.type;
    }
    public getDescription(): string {
        return this.description;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
}
