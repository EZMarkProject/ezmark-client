'use client'

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Check, MoveLeft, Save, FileDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditorNavbarProps } from "./interface"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export function EditorNavbar({ exam, isSaved = true, onSave, onExportPDF }: EditorNavbarProps) {
    const { toast } = useToast();

    const handleSave = async () => {
        await onSave();
        toast({
            title: "Saved",
            description: "Your changes have been saved.",
            duration: 1000
        });
    }

    const handleExportPDF = async () => {
        await onExportPDF();
        toast({
            title: "Exported",
            description: "Your exam have been exported.",
            duration: 1000
        });
    }

    return (
        <nav className="flex h-[50px] items-center border-b px-4 justify-between">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                >
                    <a href="/dashboard">
                        <MoveLeft className="h-4 w-4" />
                    </a>
                </Button>
                <h1 >{exam.projectName}</h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {isSaved ? (
                        <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Last saved {format(new Date(exam.updatedAt), "d MMM HH:mm")}</span>
                        </>
                    ) : (
                        <>
                            <X className="h-4 w-4 text-red-500" />
                            <span>Unsaved changes. Last saved {format(new Date(exam.updatedAt), "d MMM HH:mm")}</span>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleSave}
                >
                    <Save className="h-4 w-4" />
                    Save
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleExportPDF}
                >
                    <FileDown className="h-4 w-4" />
                    Export PDF
                </Button>
                <ThemeToggle />
            </div>
        </nav>
    )
} 