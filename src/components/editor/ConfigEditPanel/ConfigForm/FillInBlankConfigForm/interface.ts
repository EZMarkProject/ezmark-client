import { FillInBlankQuestionData } from "@/types/exam";

interface FillInBlankConfigFormProps {
    fillInBlank: FillInBlankQuestionData;
    onFillInBlankChange: (updatedFillInBlank: Partial<FillInBlankQuestionData>) => Promise<void>;
}

export type { FillInBlankConfigFormProps }; 