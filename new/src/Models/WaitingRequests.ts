export class WaitingRequests {
    private studentId: number;
    private requestTypeIds: number;
    private requestTypeName: string;
    private currentIndex: number;
    private information: string;
    private whenCreated: Date;
    private currentActorId: number;
    private status: string;
    public studentName:string;
    public studentMail:string;
    public studentDepartment:number;


    constructor(studentId: number,studentName:string, studentMail:string, studentDepartment:number,
         requestTypeIds: number, requestTypeName: string, currentIndex: number, information: string, whenCreated: Date, currentActorId: number, status:string) {
        this.studentId = studentId;
        this.requestTypeIds = requestTypeIds;
        this.requestTypeName = requestTypeName;
        this.currentIndex = currentIndex;
        this.information = information;
        this.whenCreated = whenCreated;
        this.currentActorId = currentActorId;
        this.studentName=studentName;
        this.studentMail=studentMail;
        this.studentDepartment=studentDepartment;
        this.status=status;
    }

    public getStudentMail(): string {
        return this.studentMail;
    }

    public setStudentMail(studentMail: string): void{
        this.studentMail = studentMail;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void{
        this.status = status;
    }

    public getStudentId(): number {
        return this.studentId;
    }

    public getRequestTypeIds(): number {
        return this.requestTypeIds;
    }

    public getRequestTypeName(): string {
        return this.requestTypeName;
    }

    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    public getInformation(): string {
        return this.information;
    }

    public getWhenCreated(): Date {
        return this.whenCreated;
    }

    public getWhenCreatedFormatted(): string {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return this.whenCreated.toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }


    public getCurrentActorId(): number {
        return this.currentActorId;
    }

    public setStudentId(studentId: number): void {
        this.studentId = studentId;
    }

    public setRequestTypeIds(requestTypeIds: number): void {
        this.requestTypeIds = requestTypeIds;
    }

    public setRequestTypeName(requestTypeName: string): void {
        this.requestTypeName = requestTypeName;
    }

    public setCurrentIndex(currentIndex: number): void {
        this.currentIndex = currentIndex;
    }

    public setInformation(information: string): void {
        this.information = information;
    }

    public setWhenCreated(whenCreated: Date): void {
        this.whenCreated = whenCreated;
    }


    public setCurrentActorId(currentActorId: number): void {
        this.currentActorId = currentActorId;
    }
}