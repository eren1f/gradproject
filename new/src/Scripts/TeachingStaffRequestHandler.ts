import { WaitingRequests } from "@/Models/WaitingRequests";

import { apiRoute } from "../Api_Routes/apiRoute" ;

export class TeachingStaffRequestHandler {
    private static instance: TeachingStaffRequestHandler;

    private constructor() {}

    public static getInstance(): TeachingStaffRequestHandler {
        if (!TeachingStaffRequestHandler.instance) {
            TeachingStaffRequestHandler.instance = new TeachingStaffRequestHandler();
        }
        return TeachingStaffRequestHandler.instance;
    }

    async getWaitingRequestsForTeachingStaff(): Promise<WaitingRequests[]> {
        const url = "http://localhost:8080/listWaitingRequestsForStaff";
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
            return data.map((item: any) => new WaitingRequests(
                item.studentId,
                item.studentName,
                item.studentMail,
                item.studentDepartment,
                item.requestTypeId,
                item.requestTypeName,
                item.current_index,
                item.information,
                item.addition,
                new Date(item.whenCreated),
                item.currentActorId,
                item.status,
                item.adviserName,
                item.adviserId
            ));
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async getAllRequestsForTeachingStaff(): Promise<WaitingRequests[]> {
        const url = apiRoute + "requestsForStaff";
        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            let requests: WaitingRequests[] = [];
/*             return data.map((item:any) => new WaitingRequests(
                item.studentId,
                item.studentName,
                item.studentMail,
                item.studentDepartment,
                item.requestTypeId,
                item.requestTypeName,
                item.current_index,
                item.information,
                new Date(item.whenCreated),
                item.currentActorId
            )); */
            for(let i=0; i<data.length; i++){
                let temp = new WaitingRequests(data[i].studentId,data[i].studentName,data[i].studentMail,data[i].studentDepartment,
                    data[i].requestTypeId,data[i].requestTypeName,data[i].current_index,data[i].information,
                    data[i].addition,new Date(data[i].whenCreated),data[i].currentActorId, data[i].status);
                requests.push(temp);
                console.log(temp);
            }
            return requests;
        }catch(error){
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async getConcludedForTeachingStaff(): Promise<WaitingRequests[]> {
        const url = apiRoute + "concludedRequests";
        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            let requests: WaitingRequests[] = [];
            return data.map((item:any) => new WaitingRequests(
                item.studentId,
                item.studentName,
                item.studentMail,
                item.studentDepartment,
                item.requestTypeId,
                item.requestTypeName,
                item.current_index,
                item.information,
                item.addition,
                new Date(item.whenCreated),
                item.currentActorId,
                item.status
            ));
        }catch(error){
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async acceptRequest(studentId:number,requestTypeId:number,when:string,currentIndex:number,status:string): Promise<any>{
        const url= apiRoute + "acceptRequest";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    studentId: studentId,
                    requestTypeId: requestTypeId,
                    when: when,
                    currentIndex: currentIndex,
                    status: status
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async rejectRequest(studentId:number, requestTypeId:number, when:string, currentIndex:number,status:string): Promise<any>{
        const url= apiRoute + "rejectRequest";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    requestStudentId: studentId,
                    requestTypeId: requestTypeId,
                    requestWhenCreated: when,
                    currentIndex: currentIndex,
                    status: status
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }

    }
    
}