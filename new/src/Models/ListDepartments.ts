export class ListDepartments {
    private departmentId: number;
    private departmentName: string;

    constructor(departmentId: number, departmentName: string) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    getDepartmentId(): number {
        return this.departmentId;
    }

    setDepartmentId(departmentId: number): void {
        this.departmentId = departmentId;
    }

    getDepartmentName(): string {
        return this.departmentName;
    }

    setDepartmentName(departmentName: string): void {
        this.departmentName = departmentName;
    }
}