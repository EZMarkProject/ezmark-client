import { Exam } from "@/types/exam";
import { type HTMLAttributes } from "react"

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
    exam: Exam
    renderMode: boolean
    onRenderModeChange: (mode: boolean) => void
    onMCQQuestionChange: (questionId: string, content: string) => void
    onMCQOptionChange: (questionId: string, optionIndex: number, content: string) => void
    onFillInBlankContentChange: (questionId: string, content: string) => void
}

export type { CanvasProps }; 