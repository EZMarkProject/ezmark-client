import { cn } from "@/lib/utils"
import { type ConfigEditPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ConfigEditPanel({ className, ...props }: ConfigEditPanelProps) {
    return (
        <div className={cn("flex flex-col", className)} {...props}>
            <div className="border-b p-3">
                <h2 className="text-lg text-center">Configuration</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
                {/* Configuration options will be rendered here */}
            </ScrollArea>
        </div>
    )
} 