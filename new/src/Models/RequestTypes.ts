export class RequestTypes {
    private requestName: string;
    private id: number ;
    private departmentId: number;
    private info: string;

    constructor(requestName: string, id: number=0, departmentId: number, info: string = '') {
        this.requestName = requestName;
        this.id = id;
        this.departmentId = departmentId;
        this.info = info;
    }

    public getRequestName(): string {
        return this.requestName;
    }

    public getId(): number  {
        return this.id;
    }

    public setRequestName(requestName: string): void {
        this.requestName = requestName;
    }

    public setId(id: number): void {
        this.id = id;
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