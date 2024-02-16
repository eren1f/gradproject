export class ListRequests {
    private requestId: number;
    private requestType: string;
    private requestStatus: string;

    constructor(requestId: number, requestType: string, requestStatus: string) {
        this.requestId = requestId;
        this.requestType = requestType;
        this.requestStatus = requestStatus;
    }

    getRequestId(): number {
        return this.requestId;
    }

    setRequestId(requestId: number): void {
        this.requestId = requestId;
    }

    getRequestType(): string {
        return this.requestType;
    }

    setRequestType(requestType: string): void {
        this.requestType = requestType;
    }

    getRequestStatus(): string {
        return this.requestStatus;
    }

    setRequestStatus(requestStatus: string): void {
        this.requestStatus = requestStatus;
    }
}
