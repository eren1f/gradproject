import { WaitingRequests } from "@/Models/WaitingRequests";

import { apiRoute } from "../Api_Routes/apiRoute" ;

export class TeachingStaffRequestHandler {
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
                new Date(item.whenCreated),
                item.currentActorId
            ));
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async acceptRequest(studentId:number,requestTypeId:number,when:string,currentIndex:number): Promise<any>{
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
                    currentIndex: currentIndex
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

    async rejectRequest(){

    }
}