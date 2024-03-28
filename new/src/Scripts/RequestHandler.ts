import { RequestTypes } from '../Models/RequestTypes';

export class RequestHandler {
    async getRequestTypes(): Promise<RequestTypes[]> {
        const url = "http://localhost:8080/requestTypes";
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
            const res: RequestTypes[] = data.map((item: any) => new RequestTypes(item.requestName, item.id));
            return res;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error}`);
        }
    }
}
