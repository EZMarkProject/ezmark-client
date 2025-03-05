'use client'

import { cn } from "@/lib/utils"
import { type A4ExamPaperProps } from "./interface"
import ExamPaperTemplate from "@/components/exam-paper-template"

export function A4ExamPaper({
    className,
    scale = 1,
    ...props
}: A4ExamPaperProps) {
    return (
        <div
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.1s ease-out',
                width: 'fit-content',
                paddingTop: '1rem'
            }}
            className={cn(className)}
        >
            <ExamPaperTemplate exam={props.exam} renderMode={props.renderMode} />
        </div>
    )
} 