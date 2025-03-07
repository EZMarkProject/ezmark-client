import { OpenQuestionData } from "@/types/exam";

interface OpenQuestionConfigFormProps {
    openQuestion: OpenQuestionData;
    onOpenQuestionChange: (updatedOpenQuestion: Partial<OpenQuestionData>) => void;
}

export type { OpenQuestionConfigFormProps }; 