import { ThemeToggle } from "@/components/ui/theme-toggle"

export function EditorNavbar() {
    return (
        <nav className="flex h-16 items-center border-b px-4 justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">AI Exam Paper Editor</h1>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </nav>
    )
} 