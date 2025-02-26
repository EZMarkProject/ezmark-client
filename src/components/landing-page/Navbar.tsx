"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavbarProps } from "./interface";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const Navbar: React.FC<NavbarProps> = ({
    className,
    onLoginClick,
    onSignUpClick,
}) => {
    const { locale, setLocale, t } = useLanguage();

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
                            {t('product')}
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
                            {t('company')}
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
                        {t('pricing')}
                    </Link>

                    <div className="relative group">
                        <button className="flex items-center gap-1 text-sm font-medium">
                            {t('resources')}
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
                        {t('login')}
                    </Button>
                    <Button
                        className="bg-[#1e293b] text-white hover:bg-[#1e293b]/90"
                        onClick={onSignUpClick}
                    >
                        {t('signup')}
                    </Button>

                    {/* 语言切换下拉菜单 */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Globe className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                                onClick={() => setLocale('en')}
                                className={locale === 'en' ? 'bg-muted' : ''}
                            >
                                <div className="flex items-center">
                                    <div className="mr-2 h-5 w-5 bg-blue-500"></div>
                                    <span>{t('english')}</span>
                                    {locale === 'en' && <span className="ml-auto">✓</span>}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => setLocale('zh')}
                                className={locale === 'zh' ? 'bg-muted' : ''}
                            >
                                <div className="flex items-center">
                                    <div className="mr-2 h-5 w-5 bg-red-500"></div>
                                    <span>{t('chinese')}</span>
                                    {locale === 'zh' && <span className="ml-auto">✓</span>}
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Navbar; 