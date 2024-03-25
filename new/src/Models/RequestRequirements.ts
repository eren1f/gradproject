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
    
    public setRequestTypeId(requestTypeId: number): void {
        this.requestTypeId = requestTypeId;
    }
    
    public setIndex(index: number): void {
        this.index = index;
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    
    public setType(type: string): void {
        this.type = type;
    }
    
    public setPretext(pretext: string): void {
        this.pretext = pretext;
    }
}
