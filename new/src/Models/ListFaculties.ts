export class ListFaculties {
    private facultyId: number;
    private facultyName: string;

    constructor(facultyId: number, facultyName: string) {
        this.facultyId = facultyId;
        this.facultyName = facultyName;
    }

    getFacultyId(): number {
        return this.facultyId;
    }

    setFacultyId(facultyId: number): void {
        this.facultyId = facultyId;
    }

    getFacultyName(): string {
        return this.facultyName;
    }

    setFacultyName(facultyName: string): void {
        this.facultyName = facultyName;
    }
}