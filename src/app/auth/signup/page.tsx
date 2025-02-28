'use client'
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SignUpFormData } from "@/components/auth/sign-up-form/interface";
import { useToast } from "@/hooks/use-toast";
import Cookies from 'js-cookie';
import { API_HOST } from "@/lib/host";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleSuccess = (responseData: any) => {
        Cookies.set("jwt", responseData.jwt, {
            secure: true,
            sameSite: "strict",
        });
        toast({
            title: "Registration Successful",
            description: "Your account has been created successfully."
        });
        router.push("/");
    }

    /**
     * Handle the sign up process
     * @param data - The sign up form data
     */
    const handleSignUp = async (data: SignUpFormData) => {
        try {
            const response = await fetch(`${API_HOST}/auth/local/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: data.name,
                    email: data.email,
                    password: data.password
                }),
            });
            const responseData = await response.json();

            // Toasts
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: responseData.error?.message || "An error occurred during registration. Please try again."
                });
                return;
            }

            handleSuccess(responseData);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later."
            });
        }
    };

    return (
        <div className="container m-auto">
            <SignUpForm onSubmit={handleSignUp} />
        </div>
    );
} 