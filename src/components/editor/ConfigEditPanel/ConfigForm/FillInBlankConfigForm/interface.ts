import { FillInBlankQuestionData } from "@/types/exam";

interface FillInBlankConfigFormProps {
    fillInBlank: FillInBlankQuestionData;
    onFillInBlankChange: (updatedFillInBlank: Partial<FillInBlankQuestionData>) => void;
}

export type { FillInBlankConfigFormProps }; 