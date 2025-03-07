import { OpenQuestionData } from "@/types/exam";

interface OpenQuestionConfigFormProps {
    openQuestion: OpenQuestionData;
    onOpenQuestionChange: (updatedOpenQuestion: Partial<OpenQuestionData>) => Promise<void>;
}

export type { OpenQuestionConfigFormProps }; 