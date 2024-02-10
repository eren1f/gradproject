export class StudentRequests {
    private studentId: number;
    private currentIndex: number;
    private information: String;
    private status: String;
    private when: Date;

    constructor(studentId: number, currentIndex: number, information: String, status: String, when: Date) {
        this.studentId = studentId;
        this.currentIndex = currentIndex;
        this.information = information;
        this.status = status;
        this.when = when;
    }

    public getStudentId(): number {
        return this.studentId;
    }

    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    public getInformation(): String {
        return this.information;
    }

    public getStatus(): String {
        return this.status;
    }

    public setStudentId(studentId: number): void {
        this.studentId = studentId;
    }

    public setCurrentIndex(currentIndex: number): void {
        this.currentIndex = currentIndex;
    }

    public setInformation(information: String): void {
        this.information = information;
    }

    public setStatus(status: String): void {
        this.status = status;
    }

    public getWhen(): Date {
        return this.when;
    }

    public setWhen(when: Date): void {
        this.when = when;
    }
}