export class StudentRequests {
    private studentId: number;
    private currentIndex: number;
    private information: String;
    private status: string;
    private addition: string;
    private whenCreated: Date;
    private reason: string;

    constructor(studentId: number, currentIndex: number, information: String, status: string, addition: string, whenCreated: Date, reason: string) {
        this.studentId = studentId;
        this.currentIndex = currentIndex;
        this.information = information;
        this.status = status;
        this.addition = addition;
        this.whenCreated = whenCreated;
        this.reason = reason;
    }

    getStudentId(): number {
        return this.studentId;
    }

    getCurrentIndex(): number {
        return this.currentIndex;
    }

    getInformation(): String {
        return this.information;
    }

    getStatus(): string {
        return this.status;
    }

    getWhenCreated(): Date {
        return this.whenCreated;
    }
    getAddition(): string {
        return this.addition;
    }

    getWhenCreatedFormatted(): string {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return this.whenCreated.toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getReason(): string {
        return this.reason;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    setWhenCreated(whenCreated: Date): void {
        this.whenCreated = whenCreated;
    }

    setInformation(information: String): void {
        this.information = information;
    }

    setCurrentIndex(currentIndex: number): void {
        this.currentIndex = currentIndex;
    }

    setStudentId(studentId: number): void {
        this.studentId = studentId;
    }

}