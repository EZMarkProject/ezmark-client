'use client'

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Check, MoveLeft, Save, FileDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditorNavbarProps } from "./interface"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

export function EditorNavbar({ exam, isSaved = true, onSave, onExportPDF }: EditorNavbarProps) {
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [showExportDialog, setShowExportDialog] = useState(false);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onSave();
            toast({
                title: "Saved",
                description: "Your changes have been saved.",
                duration: 1000
            });
        } finally {
            setIsSaving(false);
        }
    }

    const handleExportPDF = async () => {
        try {
            setIsExporting(true);
            setShowExportDialog(true);
            const url = await onExportPDF();

            // Create a temporary link element and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${exam.projectName}-${format(new Date(), "yyyy-MM-dd-HH-mm")}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: "Exported",
                description: "Your exam has been exported.",
                duration: 1000
            });
        } finally {
            setIsExporting(false);
            setShowExportDialog(false);
        }
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
                <h1>{exam.projectName}</h1>
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
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleExportPDF}
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                        <FileDown className="h-4 w-4" />
                    )}
                    {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
                <ThemeToggle />
            </div>

            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Exporting PDF</DialogTitle>
                        <DialogDescription>
                            Please wait while we generate your PDF file...
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
                    </div>
                </DialogContent>
            </Dialog>
        </nav>
    )
} 