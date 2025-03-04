import { Exam } from '@/types.d';

export interface ExamPaperTemplateProps {
    exam: Exam;
    renderMode: boolean;
    onMCQQuestionChange?: (questionId: string, content: string) => void;
    onMCQOptionChange?: (questionId: string, optionIndex: number, content: string) => void;
    onFillInBlankContentChange?: (questionId: string, content: string) => void;
} 