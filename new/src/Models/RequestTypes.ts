export class RequestTypes {
    private requestName: string;
    private departmentId: number;
    private info: string;

    constructor(requestName: string, departmentId: number, info: string = '') {
        this.requestName = requestName;
        this.departmentId = departmentId;
        this.info = info;
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