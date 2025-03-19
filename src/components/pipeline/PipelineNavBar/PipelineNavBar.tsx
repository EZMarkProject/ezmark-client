import { ArrowLeft } from "lucide-react";
import { PipelineNavBarProps } from "./interface";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { ExamScheduleProgress } from "@/types/types";
import { cn } from "@/lib/utils";

const allSteps: {
    progress: ExamScheduleProgress,
    displayName: string,
}[] = [
        {
            progress: 'CREATED',
            displayName: 'Start',
        },
        {
            progress: 'UPLOADED',
            displayName: 'Upload',
        },
        {
            progress: 'MATCH_START',
            displayName: 'Identify',
        },
        {
            progress: 'MATCH_DONE',
            displayName: 'Match',
        },
        {
            progress: 'DONE',
            displayName: 'Done',
        },
    ]

export default function PipelineNavBar({ examName, progress }: PipelineNavBarProps) {
    return (
        <header className="w-full bg-background border-b">
            <div className="w-full flex justify-between items-center h-14 px-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Back to dashboard"
                            className="rounded-full hover:bg-accent hover:text-accent-foreground"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Back to dashboard</span>
                        </Button>
                    </Link>
                    <h2 className="text-lg font-medium">{examName}</h2>
                </div>

                <div className="flex-1 max-w-md mx-auto">
                    <nav className="w-96 flex items-center justify-between">
                        {allSteps.map((step, index) => {
                            // Determine the current progress index
                            const currentStepIndex = allSteps.findIndex(s => s.progress === progress);

                            // Determine step status
                            const isCompleted = index < currentStepIndex;
                            const isCurrent = step.progress === progress;

                            return (
                                <div key={step.progress} className="flex items-center">
                                    <span className={cn(
                                        "font-medium",
                                        isCompleted ? "text-foreground" :
                                            isCurrent ? "text-primary font-semibold border border-primary rounded-lg px-2" :
                                                "text-muted-foreground"
                                    )}>
                                        {step.displayName}
                                    </span>

                                    {index < allSteps.length - 1 && (
                                        <span className="mx-1.5 text-muted-foreground">
                                            &#8250;
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex justify-end">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
} 