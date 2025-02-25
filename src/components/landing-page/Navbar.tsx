"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavbarProps } from "./interface";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar: React.FC<NavbarProps> = ({
    className,
    onLoginClick,
    onSignUpClick,
}) => {
    return (
        <header className={cn("w-full border-b bg-background flex justify-around", className)}>
            <div className="container flex h-16 items-center px-4 md:px-6 justify-around">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="EZMark Logo"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-bold">EZMark</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 ml-10 justify-center">
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium">
                            Product
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>

                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium">
                            Company
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>

                    <Link href="/pricing" className="text-sm font-medium">
                        Pricing
                    </Link>

                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium">
                            Resources
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        className="hidden md:flex"
                        onClick={onLoginClick}
                    >
                        Login
                    </Button>
                    <Button
                        className="bg-[#1e293b] text-white hover:bg-[#1e293b]/90"
                        onClick={onSignUpClick}
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar; 