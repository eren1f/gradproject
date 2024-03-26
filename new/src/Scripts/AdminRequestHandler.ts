import { RequestTypes } from "@/Models/RequestTypes";
import { ListDepartments } from "../Models/ListDepartments";
import { ListFaculties } from "../Models/ListFaculties";
import { ListRequestTypes } from "@/Models/ListRequestTypes";
import { apiRoute } from "../Api_Routes/apiRoute" ;
import type { RequestActor } from "@/Models/RequestActor";
import type { RequestRequirement } from "@/Models/RequestRequirements";

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


    async addNewRequestActor(requestActor: RequestActor): Promise<RequestActor|null> {
        const url = apiRoute + "CreateNewRequestActor";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',

                body: JSON.stringify(requestActor),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            const res: RequestActor =(data.requestTypeId, data.staffId, data.index);
            return res;
        }catch (error) {
            return null;
        }
        
    }

    async addNewRequestRequirement(requestRequirement: RequestRequirement): Promise<RequestRequirement|null> {
    
        const url = apiRoute + "addNewRequirement";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestRequirement),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const res: RequestRequirement = (data.requestTypeId, data.index, data.name, data.type, data.description);
            return res;
        }catch (error) {
            return null;
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
    async deleteRequestType(requestId: number): Promise<boolean> {
        const url = apiRoute + "deleteRequestType/" + requestId;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return true;
        }catch (error) {
            return false;
        }
    }

    async deleteRequestActor(requestTypeId:number, staffId:number, index: number){
        const url = apiRoute + "DeleteRequestActor/" + requestTypeId + "/" + staffId+ "/" + index;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return true;
        }catch (error) {
            return false;
        }
    }

    async deleteRequestRequirement(requestTypeId:number, index:number){
        const url = apiRoute + "deleteRequirement/" + requestTypeId + "/" + index;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return true;
        }catch (error) {
            return false;
        }
    }

/*     async updateRequestRequirement( oldRequirement: RequestRequirement, newRequirement: RequestRequirement): Promise <RequestRequirement | null>{
        const url = apiRoute + "updateRequestRequirement/" + oldRequirement.requestTypeId + "/" + oldRequirement.index ;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newRequirement),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }catch (error) {
            return null;
        }
    } */

    async updateRequestRequirement(requirements: RequestRequirement[]): Promise <any>{
        const url = apiRoute + "updateRequirements/"
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
            return response.json();
        }catch (error) {
            return null;
        }
    }

    async updateRequestActor ( actors: RequestActor[]): Promise <any>{
        const url = apiRoute + "updateActors/" ;
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
            return response.json();
        }catch (error) {
            return null;
        }
    }

/*     async updateRequestActor (oldActor: RequestActor, newActor: RequestActor): Promise <RequestActor | null>{
        const url = apiRoute + "updateRequestActor/" + oldActor.requestTypeId + "/" + oldActor.staffId;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newActor),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }catch (error) {
            return null;
        }
    } */

    async updateRequestType(request: RequestTypes): Promise<RequestTypes | null> {
        const url = apiRoute + "updateRequestType";
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            return Promise.resolve(null);
        }
    
    }

    async getRequestRequirementsByRequestTypeId(requestTypeId: number): Promise<RequestRequirement[]> {
        const url= apiRoute + "getRequestRequirements/" + requestTypeId;
        let requirements: RequestRequirement[] = [];
        try{
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
            for(let i= 0; i<data.length; i++){
                requirements.push(data[i]);
            }
            return requirements;
        }catch(error){
            return new Array<RequestRequirement>();
        }
    
    }
    async getRequestActorsByRequestTypeId(requestTypeId: number): Promise<RequestActor[]> {
        const url= apiRoute + "GetRequestActors/" + requestTypeId;
        let actors: RequestActor[] = [];
        try{
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
            for(let i= 0; i<data.length; i++){
                actors.push(data[i]);
            }
            return actors;
        }catch(error){
            return new Array<RequestActor>();
        }

    
    }
    
    
}