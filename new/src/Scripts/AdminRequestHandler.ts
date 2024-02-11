import { ListDepartments } from "../Models/ListDepartments";
import { ListFaculties } from "../Models/ListFaculties";
import { ListRequestTypes } from "@/Models/ListRequestTypes";

export class AdminRequestHandler {
    async getRequestTypes(): Promise<ListRequestTypes[]> {
        const url = "http://localhost:8080/getAllRequestTypes";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const res: ListRequestTypes[] = data.map((requestType: any) => new ListRequestTypes(requestType.id, requestType.requestName));
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
    async getRequestTypesByDepartmentId(departmentId: number): Promise<ListRequestTypes[]> {
        const url = `http://localhost:8080/getAllRequestTypesByDepartmentId/${departmentId}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const res: ListRequestTypes[] = data.map((requestType: any) => new ListRequestTypes(requestType.id, requestType.requestName));
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
    async getFaculties(): Promise<ListFaculties[]> {
        const url = "http://localhost:8080/getAllFaculties";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const res: ListFaculties[] = data.map((faculty: any) => new ListFaculties(faculty.id, faculty.name));
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
    async getDepartments(): Promise<ListDepartments[]> {
        const url = "http://localhost:8080/getAllDepartments";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const res: ListDepartments[] = data.map((department: any) => new ListDepartments(department.id, department.departmentName));
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
    async getDepartmentsByFacultyId(facultyId: number): Promise<ListDepartments[]> {
        const url = `http://localhost:8080/getDepartmentsByFacultyId/${facultyId}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const res: ListDepartments[] = data.map((department: any) => new ListDepartments(department.id, department.departmentName));
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
}