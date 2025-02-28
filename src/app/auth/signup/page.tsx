'use client'
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
    const handleSignUp = async (data: any) => {
        console.log(data);
    };

    return (
        <div className="container m-auto">
            <SignUpForm onSubmit={handleSignUp} />
        </div>
    );
} 