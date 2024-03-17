export class RequestTypes {
    private requestTypeId: number;
    private requestName: string;
    private departmentId: number;
    private info: string;

    constructor(requestTypeId: number, requestName: string, departmentId: number, info: string = '') {
        this.requestTypeId = requestTypeId;
        this.requestName = requestName;
        this.departmentId = departmentId;
        this.info = info;
    }

    public getRequestTypeId(): number {
        return this.requestTypeId;
    }
    public getRequestName(): string {
        return this.requestName;
    }

    public setRequestName(requestName: string): void {
        this.requestName = requestName;
    }

    public getDepartmentId(): number {
        return this.departmentId;
    }

    public setDepartmentId(departmentId: number): void {
        this.departmentId = departmentId;
    }

    public getInfo(): string {
        return this.info;
    }

    public setInfo(info: string): void {
        this.info = info;
    }

}