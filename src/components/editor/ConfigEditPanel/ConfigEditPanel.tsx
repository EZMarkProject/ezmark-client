import { cn } from "@/lib/utils"
import { type ConfigEditPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings } from "lucide-react"

export function ConfigEditPanel({ className, ...props }: ConfigEditPanelProps) {
    return (
        <div className={cn("flex flex-col h-full", className)} {...props}>
            <div className="bg-gradient-to-r from-primary/3 to-primary/5 px-5 py-3 border-b">
                <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="text-base font-semibold tracking-tight">Configuration</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Customize your exam paper settings and preferences</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                {/* Configuration options will be rendered here */}
            </ScrollArea>
        </div>
    )
} 