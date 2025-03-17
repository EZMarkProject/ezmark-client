"use client";

import {
    BookOpenText,
    Users,
    LayoutGrid,
    CreditCard,
    PlusCircle,
    Folder,
    Share,
    UserCircle,
    School
} from "lucide-react";
import { NavigationProps } from "./interface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    {
        id: "exams",
        label: "Exam Papers",
        icon: BookOpenText,
    },
    {
        id: "students",
        label: "Students",
        icon: Users,
    },
    {
        id: "classes",
        label: "Classes",
        icon: School,
    },
    {
        id: "accounts",
        label: "Accounts",
        icon: LayoutGrid,
    },
    {
        id: "cards",
        label: "Cards",
        icon: CreditCard,
    },
    {
        id: "transaction",
        label: "Transaction",
        icon: PlusCircle,
    },
    {
        id: "spend-groups",
        label: "Spend Groups",
        icon: Folder,
    },
    {
        id: "integrations",
        label: "Integrations",
        icon: Share,
    },
    {
        id: "payees",
        label: "Payees",
        icon: UserCircle,
    },
    {
        id: "invoices",
        label: "Invoices",
        icon: CreditCard,
    },
];

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
    return (
        <nav className="flex flex-col gap-2 px-4 py-3">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                    <Button
                        key={item.id}
                        variant="ghost"
                        className={cn(
                            "justify-start gap-3 text-base font-normal py-3 px-4 rounded-lg",
                            activeTab === item.id
                                ? "bg-background/90 text-foreground font-medium shadow-sm hover:bg-background/90"
                                : "text-foreground/70 hover:text-foreground hover:bg-background/60"
                        )}
                        onClick={() => onTabChange(item.id)}
                    >
                        <Icon className="h-5 w-5" strokeWidth={2.5} />
                        <span>{item.label}</span>
                    </Button>
                );
            })}
        </nav>
    );
};

export default Navigation; 