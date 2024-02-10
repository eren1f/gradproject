import type { DashboardAdvisorInfo } from "@/Models/DashboardAdvisorInfo";
import type { StudentRequests } from "@/Models/StudentRequests";
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

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const res: DashboardAdvisorInfo = await response.json();
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
            const res: StudentRequests[] = await response.json();
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

            // TODO
            // redirect to main page
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
}