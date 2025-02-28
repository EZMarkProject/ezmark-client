'use client'
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SignUpFormData } from "@/components/auth/sign-up-form/interface";

export default function SignUpPage() {
    const handleSignUp = async (data: SignUpFormData) => {
        console.log(data);
    };

    return (
        <div className="container m-auto">
            <SignUpForm onSubmit={handleSignUp} />
        </div>
    );
} 