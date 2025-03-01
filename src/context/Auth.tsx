'use client'
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContextObject } from "@/types";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const AuthContext = createContext<AuthContextObject>({
    userName: "",
    email: "",
    jwt: "",
    authenticated: false,
    setUserName: () => { },
    setEmail: () => { },
    setJwt: () => { },
    setAuthenticated: () => { }
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [jwt, setJwt] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const jwt = Cookies.get("jwt");
        if (jwt) {
            setJwt(jwt);
            const userName = localStorage.getItem("userName");
            const email = localStorage.getItem("email");
            if (userName && email) {
                setUserName(userName);
                setEmail(email);
                // 只有当用户名和邮箱都存在时，才认为用户已登录
                setAuthenticated(true);
            } else {
                toast({
                    title: "Login Required",
                    description: "Please login to continue",
                    duration: 2000
                });
                router.push("/auth/login");
            }
        }
    })

    return (
        <AuthContext.Provider value={{ userName, email, jwt, authenticated, setUserName, setEmail, setJwt, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}