import { Login } from "@/Models/Login";
import { LoginResponse } from "@/Models/LoginResponse";

export class LoginRequestHandler {
    async loginRequest(url: string, data: Login): Promise<LoginResponse> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        // TODO: redirect users according to their role

        if(res.status === "success") {
            if(res.role === "admin") {
                return res.message;
            } else if(res.role === "student") {
                return res.message;
            } else {
                return res.message;
            }
        } else {
            return res.message;
        }
    }
}