import { Login } from "@/Models/Login";
import { LoginResponse } from "@/Models/LoginResponse";
import type { LogoutResponse } from "@/Models/LogoutResponse";
import type { Router } from "vue-router";

export class Auth {
    async loginRequest(data: Login, router: Router): Promise<string> {
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
            if (res.role === "admin") {
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

    async logoutTokenDeleter(router: any): Promise<void> {
        const url = "http://localhost:8080/logout";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const res: LogoutResponse = await response.json();

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(res.getStatus() === "success") {
            router.push('/');
        } else {
            throw new Error(`HTTP error! status: ${res.getMessage()}`);
        }
    }
}