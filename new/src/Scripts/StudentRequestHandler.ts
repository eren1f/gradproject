import { DashboardAdvisorInfo } from "@/Models/DashboardAdvisorInfo";
import { StudentRequests } from "@/Models/StudentRequests";
import type { StudentSideBarInfo } from "@/Models/StudentSideBarInfo";
import type { Request } from "@/Models/Request";

export class StudentRequestHandler {
    async getStudentSideBarInfoRequest(): Promise<StudentSideBarInfo> {
        const url = "http://localhost:8080/studentInfo";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async getDashboardAdvisorInfoRequest(): Promise<DashboardAdvisorInfo> {
        const url = "http://localhost:8080/advisorInfo";
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
            const resData = await response.json();
            const res = new DashboardAdvisorInfo('', '', '', '', '');
            res.setFirstname(resData.firstname);
            res.setLastname(resData.lastname);
            res.setDepartment(resData.department);
            res.setWeb(resData.web);
            res.setPhonenumber(resData.phoneNumber);
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async getStudentRequests(): Promise<StudentRequests[]> {
        const url = "http://localhost:8080/studentRequests";
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
            const resData = await response.json();
            const res = resData.map((request: any) => new StudentRequests(
                request.studentId,
                request.currentIndex,
                request.information,
                request.status,
                request.addition,
                new Date(request.when),
            ));
            console.log(res); 
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }

    async makeRequest(request: Request): Promise<void> {
        const url = "http://localhost:8080/makeRequest";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Show popup message
            alert("Talep gonderildi!");
            //TODO: Redirect to landing page          

        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
}