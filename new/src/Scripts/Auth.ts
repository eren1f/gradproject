import { Login } from "@/Models/Login";
import { LoginResponse } from "@/Models/LoginResponse";
import type { LogoutResponse } from "@/Models/LogoutResponse";

export class Auth {

    private static instance: Auth;

    private constructor() {}

    public static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    async loginRequest(data: Login): Promise<string> {
        const url = "http://localhost:8080/login";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"email": data.email, "password": data.password}),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();

        if (res.status === "success") {
            if (res.role === "Admin") {
                return "Admin";
            } else if (res.role === "Student") {
                return "Student";
            } else {
                return "Staff";
            }
        } else {
            console.error(res.message);
            return "error";
        }
    }

    async logoutTokenDeleter() {
        const url = "http://localhost:8080/logout";
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
        return 0;
    }
}