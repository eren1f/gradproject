export class RequestRequirement {
    private requestTypeId: number;
    private index: number;
    private name: string;
    private type: string;
    private pretext: string;

    constructor(requestTypeId: number, index: number, name: string, type: string, pretext: string) {
        this.requestTypeId = requestTypeId;
        this.index = index;
        this.name = name;
        this.type = type;
        this.pretext = pretext;
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
    public getPretext(): string {
        return this.pretext;
    }
    public setPretext(pretext: string): void {
        this.pretext = pretext;
    }
}
