'use client';
import LoginForm from "@/components/auth/login-form/LoginForm";
import { LoginFormData } from "@/components/auth/login-form/interface";

export default function LoginPage() {
    const handleLogin = async (data: LoginFormData) => {
        console.log(data);
    };

    return <LoginForm onSubmit={handleLogin} />;
} 