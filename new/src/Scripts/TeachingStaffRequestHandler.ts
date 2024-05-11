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
            return data.map((item: any) => new WaitingRequests(
                item.studentId,
                item.studentName,
                item.studentEmail,
                item.studentDepartment,
                item.requestTypeId,
                item.requestTypeName,
                item.current_index,
                item.information,
                item.addition,
                new Date(item.whenCreated),
                item.currentActorId,
                item.status,
                item.advisor,
                item.adviserId
            ));
        } catch (error) {
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
            return data.map((item: any) => new WaitingRequests(
                item.studentId,
                item.studentName,
                item.studentEmail,
                item.studentDepartment,
                item.requestTypeId,
                item.requestTypeName,
                item.current_index,
                item.information,
                item.addition,
                new Date(item.whenCreated),
                item.currentActorId,
                item.status,    
                item.advisor,
                item.adviserId
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

    async rejectRequest(studentId:number, when:string, requestTypeId:number, reason:string): Promise<any>{
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
                    requestWhenCreated: when,
                    requestTypeId: requestTypeId,
                    cancellationReason: reason //allah belanizi versin
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

    async saveComment(commentMessage:string, requestStudentId:number, requestWhenCreated:string, requestTypeId:number): Promise<any>{
        const url= apiRoute + "saveComment";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    commentMessage: commentMessage,
                    requestStudentId: requestStudentId,
                    requestWhenCreated: requestWhenCreated,
                    requestTypeId: requestTypeId
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
    
    async cancelRequest(studentId:number, requestTypeId:number, when:string, reason:string): Promise<any>{
        const url= apiRoute + "cancelRequest";
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
                    cancellationReason: reason
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