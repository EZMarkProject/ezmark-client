import { ThemeToggle } from "@/components/ui/theme-toggle"

export function EditorNavbar() {
    return (
        <nav className="flex h-14 items-center border-b px-4 justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl">Nav Bar</h1>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
            </div>
        </nav>
    )
} 