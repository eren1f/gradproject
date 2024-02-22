import { RequestTypes } from "@/Models/RequestTypes";
import { ListDepartments } from "../Models/ListDepartments";
import { ListFaculties } from "../Models/ListFaculties";
import { ListRequestTypes } from "@/Models/ListRequestTypes";
import { apiRoute } from "../Api_Routes/apiRoute" ;

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
        const url = `http://localhost:8080/getAllDepartmentsByFacultyId/${facultyId}`;
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
    async addNewRequestType(request: RequestTypes): Promise<number> {
        const url = apiRoute + "createNewRequestType";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            return 0;
        }
    }
    async addNewRequestTypesRequirements(requirements: any) {
        const url = apiRoute + "addAllRequirements";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requirements),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            return 0;
        }
    }
    async addNewRequestTypesActors(actors: any) {
        const url = apiRoute + "addAllRequestActors";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(actors),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            return 0;
        }
    }



/*     async getRequestTypesByDepartmenId(departmentId: number): Promise<RequestTypes[]> {
        const url = apiRoute + "getAllRequestTypesByDepartmentId/" + departmentId;

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
            for (let i = 0; i < data.length; i++) {
                data[i] = new RequestTypes(data[i].requestName, data[i].id, data[i].departmentId, data[i].info);
            }
            return data;

        }catch (error) {
            return new Array<RequestTypes>();
        }
    } */
}