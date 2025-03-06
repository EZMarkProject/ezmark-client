'use client'

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Check, MoveLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { EditorNavbarProps } from "./interface"

export function EditorNavbar({ exam, isSaved = true }: EditorNavbarProps) {
    const router = useRouter()

    const handleClickBack = () => {
        router.push('/')
    }

    return (
        <nav className="flex h-[50px] items-center border-b px-4 justify-between">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleClickBack}
                >
                    <MoveLeft className="h-4 w-4" />
                </Button>
                <h1 className="">{exam.projectName}</h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {isSaved ? (
                        <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Last saved {exam.savedAt}</span>
                        </>
                    ) : (
                        <>
                            <X className="h-4 w-4 text-red-500" />
                            <span>Unsaved changes. Last saved {exam.savedAt}</span>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </nav>
    )
} 