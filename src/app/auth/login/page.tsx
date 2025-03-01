'use client';
import LoginForm from "@/components/auth/login-form/LoginForm";
import { LoginFormData } from "@/components/auth/login-form/interface";
import { API_HOST } from "@/lib/host";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types";
import { motion } from "framer-motion";
import axios from "axios";

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleSuccess = (responseData: LoginResponse) => {
        Cookies.set("jwt", responseData.jwt, {
            secure: true,
            sameSite: "strict",
        });
        toast({
            title: "Login Successful",
            description: "You have been successfully logged in."
        });
        router.push("/");
    }

    const handleLogin = async (data: LoginFormData) => {
        try {
            const response = await axios.post(`${API_HOST}/auth/local`, {
                identifier: data.email,
                password: data.password
            });

            handleSuccess(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: error.response.data.error.message
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later."
                });
            }
        }
    };

    return (
        <motion.div
            className="container m-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <LoginForm onSubmit={handleLogin} />
        </motion.div>
    );
} 