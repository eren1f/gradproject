import { Login } from "@/Models/Login";
import { LoginResponse } from "@/Models/LoginResponse";
import type { LogoutResponse } from "@/Models/LogoutResponse";
import bcryptjs from 'bcryptjs';

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
        const url = "http://localhost:8080/letmeout";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }else{
            //return to login page
            const res: LogoutResponse = await response.json();
            if(res.status === "success"){
                return 1;
            }

        }
        return 0;
    }
}