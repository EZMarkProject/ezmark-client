import { Exam } from "@/types/exam"

export interface A4ExamPaperProps {
    exam: Exam
    renderMode: boolean
    scale: number
    onMCQQuestionChange: (questionId: string, content: string) => void
    onMCQOptionChange: (questionId: string, optionIndex: number, content: string) => void
    onFillInBlankContentChange: (questionId: string, content: string) => void
} 