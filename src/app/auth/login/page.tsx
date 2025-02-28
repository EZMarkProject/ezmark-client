'use client';
import LoginForm from "@/components/auth/login-form/LoginForm";

export default function LoginPage() {
    const handleLogin = async (data: any) => {
        console.log(data);
    };

    return <LoginForm onSubmit={handleLogin} />;
} 