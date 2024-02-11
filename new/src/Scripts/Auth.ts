import { Login } from "@/Models/Login";
import { LoginResponse } from "@/Models/LoginResponse";
import type { LogoutResponse } from "@/Models/LogoutResponse";
import { useRouter } from 'vue-router';

export class Auth {
    async loginRequest(data: Login): Promise<LoginResponse> {
        const router = useRouter();
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

        // TODO
        //redirect users according to their role
        if (res.status === "success") {
            if (res.role === "admin") {
                return res.message;
            } else if (res.role === "Student") {
                router.push('/studentHomePage');
                return res.message;
            } else {
                return res.message;
            }
        } else {
            return res.message;
        }
    }

    async logoutTokenDeleter(): Promise<void> {
        const router = useRouter();
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