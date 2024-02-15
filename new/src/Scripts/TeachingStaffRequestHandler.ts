import { WaitingRequests } from "@/Models/WaitingRequests";

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
                item.requestTypeIds,
                item.requestTypeName,
                item.currentIndex,
                item.information,
                new Date(item.whenCreated),
                item.studentComment,
                item.currentActorId
            ));
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
}