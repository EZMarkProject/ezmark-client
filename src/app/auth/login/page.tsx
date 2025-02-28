'use client';
import LoginForm from "@/components/auth/login-form/LoginForm";
import { LoginFormData } from "@/components/auth/login-form/interface";
import { API_HOST } from "@/lib/host";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types";

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleSuccess = (responseData: LoginResponse) => {
        Cookies.set("jwt", responseData.jwt, {
            secure: true,
            sameSite: "strict",
        });
        router.push("/");
    }

    const handleLogin = async (data: LoginFormData) => {
        try {
            const response = await fetch(`${API_HOST}/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    identifier: data.email,
                    password: data.password
                })
            });
            const responseData = await response.json();

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: responseData.error.message
                });
                return;
            }

            handleSuccess(responseData);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later."
            });
        }
    };

    return <LoginForm onSubmit={handleLogin} />;
} 