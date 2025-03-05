import { cn } from "@/lib/utils"
import { type QuestionSelectionPanelProps } from "./interface"
import { ScrollArea } from "@/components/ui/scroll-area"

export function QuestionSelectionPanel({ className, ...props }: QuestionSelectionPanelProps) {
    return (
        <div className={cn("flex flex-col", className)} {...props}>
            <div className="border-b p-4">
                <h2 className="text-lg font-semibold">Question Selection</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
                {/* Question items will be rendered here */}
            </ScrollArea>
        </div>
    )
} 