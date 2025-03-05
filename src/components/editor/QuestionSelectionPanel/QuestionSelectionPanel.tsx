import { cn } from "@/lib/utils"
import { type QuestionSelectionPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"

export function QuestionSelectionPanel({ className, ...props }: QuestionSelectionPanelProps) {
    return (
        <div className={cn("flex flex-col", className)} {...props}>
            <div className="border-b p-3">
                <h2 className="text-lg text-center">Components</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
                {/* Question items will be rendered here */}
            </ScrollArea>
        </div>
    )
} 