export class Request {
    private studentId: number;
    private requestTypeId: number;
    private when: Date;
    private information: string;
    private addition: string;
    private currentIndex: number;
    private studentComment: string;

    constructor(studentId: number, requestTypeId: number, information: string, addition: string, currentIndex: number, studentComment: string) {
        this.studentId = studentId;
        this.requestTypeId = requestTypeId;
        this.when = new Date();
        this.information = information;
        this.addition = addition;
        this.currentIndex = currentIndex;
        this.studentComment = studentComment;
    }

    public getStudentId(): number {
        return this.studentId;
    }

    public getRequestTypeId(): number {
        return this.requestTypeId;
    }

    public getWhen(): Date {
        return this.when;
    }

    public getInformation(): string {
        return this.information;
    }

    public getAddition(): string {
        return this.addition;
    }

    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    public getStudentComment(): string {
        return this.studentComment;
    }

    public setStudentId(studentId: number): void {
        this.studentId = studentId;
    }

    public setRequestTypeId(requestTypeId: number): void {
        this.requestTypeId = requestTypeId;
    }

    public setWhen(when: Date): void {
        this.when = when;
    }

    public setInformation(information: string): void {
        this.information = information;
    }

    public setAddition(addition: string): void {
        this.addition = addition;
    }

    public setCurrentIndex(currentIndex: number): void {
        this.currentIndex = currentIndex;
    }

    public setStudentComment(studentComment: string): void {
        this.studentComment = studentComment;
    }
}