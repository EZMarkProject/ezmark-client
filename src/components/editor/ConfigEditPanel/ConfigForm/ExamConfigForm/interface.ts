import { ExamResponse } from "@/types/exam";

interface ExamConfigFormProps {
    exam: ExamResponse;
    onExamConfigChange: (updatedExam: Partial<ExamResponse>) => Promise<void>;
}

export type { ExamConfigFormProps }; 