import { MultipleChoiceQuestionData } from "@/types/exam";

export interface MCQConfigFormProps {
    mcq: MultipleChoiceQuestionData;
    onCMQChange: (updatedMCQ: Partial<MultipleChoiceQuestionData>) => void;
} 