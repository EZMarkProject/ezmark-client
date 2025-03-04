interface Question {
    id: string;
    type: 'multiple-choice' | 'fill-in-blank';
    question?: string;
    content?: string;
    options?: { content: string }[];
}

export interface QuestionSectionProps {
    questions: Question[];
    renderMode: boolean;
    onMCQQuestionChange?: (questionId: string, content: string) => void;
    onMCQOptionChange?: (questionId: string, optionIndex: number, content: string) => void;
    onFillInBlankContentChange?: (questionId: string, content: string) => void;
} 