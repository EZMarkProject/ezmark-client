import { ExamResponse } from "@/types/exam";

export interface CanvasSharedProps {
    exam: ExamResponse
    renderMode: boolean
    onMCQQuestionChange: (questionId: string, content: string) => void
    onMCQOptionChange: (questionId: string, optionIndex: number, content: string) => void
    onFillInBlankContentChange: (questionId: string, content: string) => void
    onOpenQuestionChange: (questionId: string, content: string) => void
    handleComponentClick: (componentId: string | null) => void
}


export interface CanvasProps extends CanvasSharedProps {
    onRenderModeChange: (mode: boolean) => void
}