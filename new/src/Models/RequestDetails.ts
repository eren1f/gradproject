export class RequestDetails {
    private requestId: number;
    private requestType: string;
    private studentId: number;
    private studentName: string;
    private dateCreated: string;
    private faculty: string;
    private course: string;
    private class: string;
    private information: string;
    private status: string;

    constructor(
        requestId: number,
        requestType: string,
        studentId: number,
        studentName: string,
        dateCreated: string,
        faculty: string,
        course: string,
        classId: number,
        information: string,
        status: string
    ) {
        this.requestId = requestId;
        this.requestType = requestType;
        this.studentId = studentId;
        this.studentName = studentName;
        this.dateCreated = dateCreated;
        this.faculty = faculty;
        this.course = course;
        this.classId = classId;
        this.information = information;
        this.status = status;
    }

    // Getters
    getRequestId(){
        return this.requestId;
    }

    getRequestType() {
        return this.requestType;
    }

    getStudentId() {
        return this.studentId;
    }

    getStudentName() {
        return this.studentName;
    }

    getDateCreated() {
        return this.dateCreated;
    }

    getFaculty() {
        return this.faculty;
    }

    getCourse() {
        return this.course;
    }

    getClassId() {
        return this.classId;
    }

    getInformation() {
        return this.information;
    }

    getStatus() {
        return this.status;
    }

    // Setters
    setRequestId(requestId: number) {
        this.requestId = requestId;
    }

    setRequestType(requestType: string) {
        this.requestType = requestType;
    }

    setStudentId(studentId: number) {
        this.studentId = studentId;
    }

    setStudentName(studentName: string) {
        this.studentName = studentName;
    }

    setDateCreated(dateCreated: string) {
        this.dateCreated = dateCreated;
    }

    setFaculty(faculty: string) {
        this.faculty = faculty;
    }

    setCourse(course: string) {
        this.course = course;
    }

    setClass(classId: number) {
        this.classId = classId;
    }

    setInformation(information: string) {
        this.information = information;
    }

    setStatus(status: string) {
        this.status = status;
    }
}